import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';

@Controller('shopping-cart')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Get('add/:userId/:productId')
  addToCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.shoppingCartsService.addToCart(userId, productId);
  }

  @Get('/:userId')
  getCart(@Param('userId') userId: number) {
    return this.shoppingCartsService.findCart(userId)
  }

  @Delete('remove/:userId/:productId')
  removeFromCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.shoppingCartsService.removeFromCart(userId, productId);
  }
}
