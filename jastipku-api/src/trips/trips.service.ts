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
}
