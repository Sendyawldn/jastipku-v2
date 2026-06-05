import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import type { JwtPayload } from "../auth/auth.constants";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ListOrdersQueryDto } from "./dto/list-orders-query.dto";
import { Prisma } from "../prisma/prisma-client";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ListOrdersQueryDto) {
    const limit = query.limit ?? 20;
    const orders = await this.prisma.order.findMany({
      take: limit + 1,
      ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
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

    const pageItems = orders.slice(0, limit);
    const nextOrder = orders.length > limit ? orders[limit] : null;

    return {
      data: pageItems,
      pageInfo: {
        limit,
        nextCursor: nextOrder?.id ?? null,
        hasNextPage: nextOrder !== null,
      },
    };
  }

  create(body: CreateOrderDto, actor: JwtPayload) {
    return this.prisma.$transaction(async (transaction) => {
      const customerId = this.resolveCustomerId(body, actor);
      const trip = await transaction.trip.findUnique({
        where: { id: body.tripId },
        select: { travelerId: true },
      });

      if (!trip) {
        throw new NotFoundException("Trip not found");
      }

      if (trip.travelerId !== body.travelerId) {
        throw new BadRequestException("travelerId must match the selected trip");
      }

      const order = await transaction.order.create({
        data: {
          customerId,
          travelerId: body.travelerId,
          tripId: body.tripId,
          status: "PENDING_ACCEPTANCE",
          totalItemPrice: new Prisma.Decimal(body.totalItemPrice),
          serviceFee: new Prisma.Decimal(body.serviceFee),
          shippingFee: body.shippingFee
            ? new Prisma.Decimal(body.shippingFee)
            : null,
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

  private resolveCustomerId(body: CreateOrderDto, actor: JwtPayload) {
    if (actor.role === "CUSTOMER") {
      return actor.sub;
    }

    if (body.customerId) {
      return body.customerId;
    }

    throw new BadRequestException("Admin order creation requires customerId");
  }
}
