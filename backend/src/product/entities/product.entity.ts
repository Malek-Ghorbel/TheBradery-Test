import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column()
    inventory: number;
}
