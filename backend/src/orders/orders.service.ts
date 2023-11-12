import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Orders } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
  ) {}

  findAll(): Promise<Orders[]>{
    return this.orderRepository.find();
  }

  async createOrder(dto: CreateOrderDto, userId: number): Promise<Orders> {
    // Executing all the operations as a single transaction for race condition and concurrency handling
    return await this.dataSource.transaction(async transactionalEntityManager => {
      // Fetch the user
      const user = await transactionalEntityManager.findOne(User, { where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Create and immediately save the order
      const order = await transactionalEntityManager.save(Orders, { user : user, total : dto.total  });

      // initialize the order items array
      const orderItems: OrderItem[] = [];

      // Process each item in the DTO
      for (const itemDto of dto.items) {
        // fetch the product
        const product = await transactionalEntityManager.findOne(Product, { where: { id: itemDto.productId } });
        if (!product) {
          throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);
        }

        // Check if the product stock is sufficient
        if (product.inventory < itemDto.quantity) {
          throw new BadRequestException(`Insufficient stock for product ID ${itemDto.productId}`);
        }

        // Decrease product stock
        product.inventory -= itemDto.quantity;
        await transactionalEntityManager.save(Product, product);

        // Save the order item
        const orderItem = transactionalEntityManager.create(OrderItem, {
          order: { id: order.id },
          product,
          quantity: itemDto.quantity,
        });
        await transactionalEntityManager.save(OrderItem, orderItem);

        // Add the item to the array
        orderItems.push(orderItem);
      }
      // Set the items and save the order 
      order.items = orderItems;
      return await transactionalEntityManager.save(Orders, order);
    });
  }
}
