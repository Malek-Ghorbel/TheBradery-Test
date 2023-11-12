import { Orders } from "src/orders/entities/order.entity";
import { ShoppingCart } from "src/shopping-carts/entities/shopping-cart.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToOne(() => ShoppingCart, cart => cart.user)
    shoppingCart: ShoppingCart; 

    @OneToMany(() => Orders, order => order.user)
    orders: Orders[];
}
