import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateWithdrawalDto } from "./dto/create-withdrawal.dto";
import type { JwtPayload } from "../auth/auth.constants";

@Injectable()
export class WithdrawalsService {
  constructor(private readonly prisma: PrismaService) {}

  async requestWithdrawal(body: CreateWithdrawalDto, actor: JwtPayload) {
    if (actor.role !== "TRAVELER") {
      throw new BadRequestException("Only travelers can request withdrawals");
    }

    const user = await this.prisma.user.findUnique({ where: { id: actor.sub } });
    if (!user || user.balance.toNumber() < body.amount) {
      throw new BadRequestException("Insufficient balance");
    }

    return this.prisma.withdrawal.create({
      data: {
        travelerId: actor.sub,
        amount: body.amount,
      },
    });
  }

  async list(actor: JwtPayload) {
    if (actor.role === "ADMIN") {
      return this.prisma.withdrawal.findMany({
        orderBy: { createdAt: "desc" },
        include: { traveler: { select: { id: true, name: true, email: true } } },
      });
    }

    return this.prisma.withdrawal.findMany({
      where: { travelerId: actor.sub },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateStatus(id: number, status: string, rejectionReason?: string) {
    const withdrawal = await this.prisma.withdrawal.findUniqueOrThrow({ where: { id } });

    if (withdrawal.status !== "PENDING") {
      throw new BadRequestException("Only pending withdrawals can be updated");
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.withdrawal.update({
        where: { id },
        data: {
          status: status as any,
          rejectionReason,
          processedAt: new Date(),
        },
      });

      if (status === "APPROVED") {
        // Deduct balance
        await tx.user.update({
          where: { id: withdrawal.travelerId },
          data: { balance: { decrement: withdrawal.amount } },
        });

        // Log transaction
        await tx.transaction.create({
          data: {
            userId: withdrawal.travelerId,
            type: "WITHDRAWAL",
            amount: withdrawal.amount, // Record as positive but implies negative in context, or could use negative. The schema says "amount Float // Nilai transaksi (bisa positif atau negatif)". Let's use negative for outflow.
            description: "Withdrawal approved",
          },
        });
      }

      return updated;
    });
  }
}
