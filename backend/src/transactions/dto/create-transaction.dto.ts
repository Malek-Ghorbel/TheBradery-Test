import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

export class CreateTransactionDto {
  userId: number;

  totalAmount: number;

  @IsArray()
  @Type(() => ProductDetailDto)
  productDetails: ProductDetailDto[];
}

export class ProductDetailDto {
  productId: number;
  quantity: number;
}
