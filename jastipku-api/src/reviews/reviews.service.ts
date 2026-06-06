import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import type { JwtPayload } from "../auth/auth.constants";

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateReviewDto, actor: JwtPayload) {
    if (actor.role !== "CUSTOMER") {
      throw new BadRequestException("Only customers can leave reviews");
    }

    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: body.orderId },
    });

    if (order.customerId !== actor.sub) {
      throw new BadRequestException("You can only review your own orders");
    }

    if (order.status !== "COMPLETED") {
      throw new BadRequestException("Can only review completed orders");
    }

    // Check if review already exists
    const existing = await this.prisma.review.findUnique({
      where: { orderId: body.orderId },
    });

    if (existing) {
      throw new BadRequestException("Review already exists for this order");
    }

    return this.prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          orderId: body.orderId,
          reviewerId: actor.sub,
          receiverId: order.travelerId,
          rating: body.rating,
          comment: body.comment,
        },
      });

      // Recalculate traveler rating
      const allReviews = await tx.review.aggregate({
        where: { receiverId: order.travelerId },
        _avg: { rating: true },
      });

      await tx.user.update({
        where: { id: order.travelerId },
        data: { averageRating: allReviews._avg.rating },
      });

      return review;
    });
  }

  async listByTraveler(travelerId: number) {
    return this.prisma.review.findMany({
      where: { receiverId: travelerId },
      orderBy: { createdAt: "desc" },
      include: {
        reviewer: { select: { name: true, profilePhotoUrl: true } },
      },
    });
  }
}
