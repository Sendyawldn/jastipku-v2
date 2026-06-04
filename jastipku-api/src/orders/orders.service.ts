import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.order.findMany({
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      include: {
        items: true,
        payment: true,
        review: true,
        trip: true,
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        traveler: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  create(body: CreateOrderDto) {
    return this.prisma.$transaction(async (transaction) => {
      const order = await transaction.order.create({
        data: {
          customerId: body.customerId,
          travelerId: body.travelerId,
          tripId: body.tripId,
          status: "PENDING_ACCEPTANCE",
          totalItemPrice: new Prisma.Decimal(body.totalItemPrice),
          serviceFee: new Prisma.Decimal(body.serviceFee),
          shippingFee: body.shippingFee ? new Prisma.Decimal(body.shippingFee) : null,
          totalAmount: new Prisma.Decimal(body.totalAmount),
          currencyCode: body.currencyCode ?? "IDR",
          shippingAddress: body.shippingAddress,
        },
      });

      if (body.items.length > 0) {
        await transaction.orderItem.createMany({
          data: body.items.map((item) => ({
            orderId: order.id,
            productName: item.productName,
            productUrl: item.productUrl,
            quantity: item.quantity,
            estimatedPrice: new Prisma.Decimal(item.estimatedPrice),
            productImageUrl: item.productImageUrl,
            notes: item.notes,
          })),
        });
      }

      return transaction.order.findUniqueOrThrow({
        where: { id: order.id },
        include: {
          items: true,
          payment: true,
          review: true,
          trip: true,
        },
      });
    });
  }
}