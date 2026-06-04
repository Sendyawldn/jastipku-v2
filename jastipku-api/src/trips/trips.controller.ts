import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateTripDto } from "./dto/create-trip.dto";
import { TripsService } from "./trips.service";

@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  list() {
    return this.tripsService.list();
  }

  @Post()
  create(@Body() body: CreateTripDto) {
    return this.tripsService.create(body);
  }
}