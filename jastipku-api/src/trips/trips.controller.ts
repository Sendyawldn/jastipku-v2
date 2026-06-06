import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/auth.constants";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";
import { TripsService } from "./trips.service";

@Controller("trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  list() {
    return this.tripsService.list();
  }

  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.tripsService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("TRAVELER", "ADMIN")
  create(@Body() body: CreateTripDto, @CurrentUser() actor: JwtPayload) {
    return this.tripsService.create(body, actor);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("TRAVELER", "ADMIN")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateTripDto,
    @CurrentUser() actor: JwtPayload,
  ) {
    return this.tripsService.update(id, body, actor);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("TRAVELER", "ADMIN")
  delete(@Param("id", ParseIntPipe) id: number, @CurrentUser() actor: JwtPayload) {
    return this.tripsService.delete(id, actor);
  }
}
