import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, item => item.order)
  items: OrderItem[];
}
