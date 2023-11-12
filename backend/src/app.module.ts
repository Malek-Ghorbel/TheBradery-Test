import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity.js'] ,
      synchronize: true,
    }),
    ProductModule,
    UsersModule,
    OrdersModule,
    ShoppingCartsModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
