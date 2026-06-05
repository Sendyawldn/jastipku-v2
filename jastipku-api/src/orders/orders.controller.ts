import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateOrderDto } from "./dto/create-order.dto";
import { ListOrdersQueryDto } from "./dto/list-orders-query.dto";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  list(@Query() query: ListOrdersQueryDto) {
    return this.ordersService.list(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("CUSTOMER", "ADMIN")
  create(@Body() body: CreateOrderDto) {
    return this.ordersService.create(body);
  }
}
