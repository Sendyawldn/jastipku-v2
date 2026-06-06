import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async handleWebhook(payload: any) {
    // This is a mock implementation of Xendit Webhook handler
    this.logger.log(`Received Xendit webhook: ${JSON.stringify(payload)}`);

    // Usually, Xendit payload contains external_id (which we map to orderId or paymentId)
    // and status (PAID, EXPIRED, etc)
    const { external_id, status } = payload;

    // For mock purpose, let's assume external_id is order-{id}
    if (!external_id || !external_id.startsWith("order-")) {
      return { success: false, message: "Invalid external_id format" };
    }

    const orderId = parseInt(external_id.replace("order-", ""), 10);

    return this.prisma.$transaction(async (tx) => {
      // Find the payment record
      let payment = await tx.payment.findUnique({
        where: { orderId },
      });

      if (!payment) {
        // Create mock payment if not exist (in real app, payment is created when generating invoice)
        payment = await tx.payment.create({
          data: {
            orderId,
            xenditInvoiceId: `inv_${Date.now()}`,
            amount: 0, // Should be fetched from order
            status: "PENDING",
          },
        });
      }

      // Log the webhook payload
      await tx.paymentLog.create({
        data: {
          paymentId: payment.id,
          rawResponse: payload,
          status: status || "UNKNOWN",
        },
      });

      if (status === "PAID") {
        // Update payment
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: "PAID", paidAt: new Date(), paymentMethod: payload.payment_method },
        });

        // Update order status
        await tx.order.update({
          where: { id: orderId },
          data: { status: "PROCESSING" },
        });

        // Log transaction (Payment In)
        await tx.transaction.create({
          data: {
            userId: payment.orderId, // Should ideally be customerId, but we only have orderId directly. Let's find order.
            type: "PAYMENT_IN",
            amount: payment.amount,
            description: `Payment for order ${orderId}`,
            relatedOrderId: orderId,
          },
        });
        
        // Wait, transaction requires userId. I need to fetch the order.
        const order = await tx.order.findUnique({ where: { id: orderId } });
        if (order) {
           await tx.transaction.updateMany({
             where: { relatedOrderId: orderId },
             data: { userId: order.customerId }
           });
        }
      }

      return { success: true };
    });
  }
}
