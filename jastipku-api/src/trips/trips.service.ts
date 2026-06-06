import { BadRequestException, Injectable } from "@nestjs/common";
import type { JwtPayload } from "../auth/auth.constants";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTripDto } from "./dto/create-trip.dto";

@Injectable()
export class TripsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.trip.findMany({
      orderBy: [{ departureDate: "asc" }, { id: "asc" }],
      include: {
        traveler: {
          select: {
            id: true,
            name: true,
            profilePhotoUrl: true,
            averageRating: true,
          },
        },
      },
    });
  }

  create(body: CreateTripDto, actor: JwtPayload) {
    const travelerId = this.resolveTravelerId(body, actor);

    return this.prisma.trip.create({
      data: {
        travelerId,
        originCity: body.originCity,
        destinationCity: body.destinationCity,
        departureDate: body.departureDate,
        arrivalDate: body.arrivalDate,
        description: body.description,
      },
    });
  }

  private resolveTravelerId(body: CreateTripDto, actor: JwtPayload) {
    if (actor.role === "TRAVELER") {
      return actor.sub;
    }

    if (body.travelerId) {
      return body.travelerId;
    }

    throw new BadRequestException("Admin trip creation requires travelerId");
  }

  getById(id: number) {
    return this.prisma.trip.findUniqueOrThrow({
      where: { id },
      include: {
        traveler: {
          select: {
            id: true,
            name: true,
            profilePhotoUrl: true,
            averageRating: true,
          },
        },
      },
    });
  }

  async update(id: number, body: any, actor: JwtPayload) {
    const trip = await this.prisma.trip.findUniqueOrThrow({ where: { id } });
    if (actor.role !== "ADMIN" && trip.travelerId !== actor.sub) {
      throw new BadRequestException("You can only edit your own trips");
    }
    return this.prisma.trip.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: number, actor: JwtPayload) {
    const trip = await this.prisma.trip.findUniqueOrThrow({ where: { id } });
    if (actor.role !== "ADMIN" && trip.travelerId !== actor.sub) {
      throw new BadRequestException("You can only delete your own trips");
    }
    return this.prisma.trip.delete({
      where: { id },
    });
  }
}
