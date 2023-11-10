import { Module } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product, ShoppingCart]),
  ],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService]
})
export class ShoppingCartsModule {}
