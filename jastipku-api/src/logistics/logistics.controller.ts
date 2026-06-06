import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { LogisticsService } from "./logistics.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("logistics")
@UseGuards(JwtAuthGuard)
export class LogisticsController {
  constructor(private readonly logisticsService: LogisticsService) {}

  @Get("cost")
  async getCost(
    @Query("origin") origin: string,
    @Query("destination") destination: string,
    @Query("weight") weight: string,
  ) {
    return this.logisticsService.calculateShippingCost(origin, destination, parseInt(weight, 10) || 1000);
  }
}
