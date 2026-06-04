import { Injectable } from "@nestjs/common";
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

  create(body: CreateTripDto) {
    return this.prisma.trip.create({
      data: {
        travelerId: body.travelerId,
        originCity: body.originCity,
        destinationCity: body.destinationCity,
        departureDate: body.departureDate,
        arrivalDate: body.arrivalDate,
        description: body.description,
      },
    });
  }
}