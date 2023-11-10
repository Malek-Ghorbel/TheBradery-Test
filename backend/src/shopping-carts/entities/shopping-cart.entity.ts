// shopping-cart.entity.ts
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, user => user.shoppingCart)
    user: User;
  
    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];
}
