import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";
import { CreateTravelerProfileDto } from "./dto/create-traveler-profile.dto";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  getProfile(@CurrentUser("sub") userId: number) {
    return this.usersService.findById(userId);
  }

  @Post("traveler-profile")
  createTravelerProfile(
    @CurrentUser("sub") userId: number,
    @Body() dto: CreateTravelerProfileDto,
  ) {
    return this.usersService.createTravelerProfile(userId, dto);
  }
}
