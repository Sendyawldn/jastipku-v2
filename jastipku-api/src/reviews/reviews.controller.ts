import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/auth.constants";
import { CreateReviewDto } from "./dto/create-review.dto";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get("traveler/:id")
  listByTraveler(@Param("id", ParseIntPipe) id: number) {
    return this.reviewsService.listByTraveler(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("CUSTOMER")
  create(@Body() body: CreateReviewDto, @CurrentUser() actor: JwtPayload) {
    return this.reviewsService.create(body, actor);
  }
}
