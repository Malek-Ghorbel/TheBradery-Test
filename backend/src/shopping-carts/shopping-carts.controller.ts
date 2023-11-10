import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post('add/:userId/:productId')
  addToCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.shoppingCartsService.addToCart(userId, productId);
  }

  @Delete('remove/:userId/:productId')
  removeFromCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.shoppingCartsService.removeFromCart(userId, productId);
  }
}
