import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Orders } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, order => order.items)
  @JoinColumn({ name: 'orderId' })
  order: Orders;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;
}
