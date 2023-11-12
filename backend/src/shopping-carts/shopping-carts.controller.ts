import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('add/:productId')
  addToCart(@Req() req, @Param('productId') productId: number) {
    const userId = req.user.userId;
    return this.shoppingCartsService.addToCart(userId, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getCart(@Req() req) {
    const userId = req.user.userId;
    return this.shoppingCartsService.findCart(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:productId')
  removeFromCart(@Req() req, @Param('productId') productId: number) {
    const userId = req.user.userId;
    return this.shoppingCartsService.removeFromCart(userId, productId);
  }
}
