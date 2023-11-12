import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const userId = req.user.userId;
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
