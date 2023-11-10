import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Orders } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, User, Product, Orders]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
