import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  async addToCart(userId: number, productId: number): Promise<ShoppingCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    let shoppingCart = await this.shoppingCartRepository.findOne({ where: { user }, relations: ['products'] });

    if (!shoppingCart) {
      shoppingCart = this.shoppingCartRepository.create({ user, products: [] });
    }

    shoppingCart.products.push(product);
    return this.shoppingCartRepository.save(shoppingCart);
  }

  async removeFromCart(userId: number, productId: number): Promise<ShoppingCart> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const shoppingCart = await this.shoppingCartRepository.findOne({ where: { user }, relations: ['products'] });
    if (!shoppingCart) throw new NotFoundException('Shopping cart not found');

    shoppingCart.products = shoppingCart.products.filter(product => product.id !== productId);
    return this.shoppingCartRepository.save(shoppingCart);
  }
}
