import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'mydb',
      entities: [__dirname + '/../**/*.entity.js'] ,
      synchronize: true,
    }),
    ProductModule,
    UsersModule,
    OrdersModule,
    ShoppingCartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
