import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import type { JwtPayload } from "../auth/auth.constants";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { ListOrdersQueryDto } from "./dto/list-orders-query.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  list(@Query() query: ListOrdersQueryDto, @CurrentUser() actor: JwtPayload) {
    return this.ordersService.list(query, actor);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getById(@Param("id", ParseIntPipe) id: number, @CurrentUser() actor: JwtPayload) {
    return this.ordersService.getById(id, actor);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("CUSTOMER", "ADMIN")
  create(@Body() body: CreateOrderDto, @CurrentUser() actor: JwtPayload) {
    return this.ordersService.create(body, actor);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateOrderStatusDto,
    @CurrentUser() actor: JwtPayload,
  ) {
    return this.ordersService.updateStatus(id, body.status, actor);
  }
}
