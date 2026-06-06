import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { WithdrawalsService } from "./withdrawals.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/auth.constants";
import { CreateWithdrawalDto } from "./dto/create-withdrawal.dto";
import { UpdateWithdrawalStatusDto } from "./dto/update-withdrawal-status.dto";

@Controller("withdrawals")
@UseGuards(JwtAuthGuard, RolesGuard)
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Get()
  @Roles("TRAVELER", "ADMIN")
  list(@CurrentUser() actor: JwtPayload) {
    return this.withdrawalsService.list(actor);
  }

  @Post()
  @Roles("TRAVELER")
  requestWithdrawal(@Body() body: CreateWithdrawalDto, @CurrentUser() actor: JwtPayload) {
    return this.withdrawalsService.requestWithdrawal(body, actor);
  }

  @Patch(":id/status")
  @Roles("ADMIN")
  updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateWithdrawalStatusDto,
  ) {
    return this.withdrawalsService.updateStatus(id, body.status, body.rejectionReason);
  }
}
