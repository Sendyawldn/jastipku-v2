import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersCronService {
  private readonly logger = new Logger(OrdersCronService.name);

  constructor(private prisma: PrismaService) {}

  // Run every midnight to check for stagnant SHIPPING orders
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleAutoCompletion() {
    this.logger.log('Running auto-completion cron job for orders...');

    // Let's assume an order auto-completes 3 days after it was marked as SHIPPING
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const ordersToComplete = await this.prisma.order.findMany({
      where: {
        status: 'SHIPPING',
        updatedAt: {
          lt: threeDaysAgo,
        },
      },
    });

    if (ordersToComplete.length === 0) {
      this.logger.log('No orders to auto-complete today.');
      return;
    }

    for (const order of ordersToComplete) {
      try {
        await this.prisma.$transaction(async (prisma) => {
          // 1. Mark order as COMPLETED
          await prisma.order.update({
            where: { id: order.id },
            data: { status: 'COMPLETED' },
          });

          // 2. Add total amount (excluding service fee if it goes to platform) or simply specific amount to Traveler's balance
          // In a real scenario, traveler receives totalAmount - platformFee. For now we assume the totalAmount goes to traveler minus a fixed fee.
          // Adjust logic based on your escrow rules:
          const travelerRevenue = order.totalItemPrice.toNumber() + order.serviceFee.toNumber();

          await prisma.user.update({
            where: { id: order.travelerId },
            data: {
              balance: {
                increment: travelerRevenue,
              },
            },
          });

          // 3. Log transaction
          await prisma.transaction.create({
            data: {
              userId: order.travelerId,
              type: 'REVENUE',
              amount: travelerRevenue,
              description: `Escrow released for Order #${order.id} (Auto-completed)`,
              relatedOrderId: order.id,
            },
          });

          this.logger.log(`Order #${order.id} auto-completed and funds released to Traveler #${order.travelerId}.`);
        });
      } catch (err) {
        this.logger.error(`Failed to auto-complete order #${order.id}`, err);
      }
    }
  }
}
