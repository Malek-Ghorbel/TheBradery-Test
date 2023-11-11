import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
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
  
  async findCart(userId: number): Promise<ShoppingCart> {
    // fetch the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // find the cart
    let shoppingCart = await this.shoppingCartRepository.findOne({ where: { user }, relations: ['products'] });

    // if not found create a new empty one
    if (!shoppingCart) {
      shoppingCart = this.shoppingCartRepository.create({ user, products: [] });
    }

    return shoppingCart
  }

  async addToCart(userId: number, productId: number): Promise<ShoppingCart> {
    // fetch the product
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    if (product.inventory == 0) throw new HttpException('product out of stock', 401)
    
    // get the cart
    let shoppingCart = await this.findCart(userId);

    // add the product and save
    shoppingCart.products.push(product);
    return this.shoppingCartRepository.save(shoppingCart);
  }

  async removeFromCart(userId: number, productId: number): Promise<ShoppingCart> {
    // fetch the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // find the cart
    const shoppingCart = await this.shoppingCartRepository.findOne({ where: { user }, relations: ['products'] });
    if (!shoppingCart) throw new NotFoundException('Shopping cart not found');

    // remove the element
    shoppingCart.products.forEach((item, index) => {
      if (item.id == productId) shoppingCart.products.splice(index,1);
    });
    return this.shoppingCartRepository.save(shoppingCart);
  }
}
