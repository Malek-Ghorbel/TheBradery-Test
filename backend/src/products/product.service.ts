import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    // look for the product
    const product = await this.productRepository.findOne({where:{id}});

    // if Product not found throw exception
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Update the product properties based on the DTO data
    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }
    if (updateProductDto.inventory) {
      product.inventory = updateProductDto.inventory;
    }
    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }

    // Save the updated product in the database
    return this.productRepository.save(product);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  // to be executed when starting the app the frst time
  async addProductsOnStart() {
    const count = await this.productRepository.count();
    // check if the products table is empty
    if (count === 0) {
      // Define the products (from the sql file)
      const products = [
        { name: 'T-shirt Blanc', price: 19.99, inventory: 100 },
        { name: 'Jean Slim Noir', price:  49.99, inventory: 75 },
        { name: 'Chaussures de Sport', price: 89.99, inventory: 50 },
        { name: 'Veste en Cuir', price: 199.99, inventory: 25 },
        { name: "Robe d'Été", price: 29.99, inventory: 60 },
        { name: 'Cravate en Soie', price: 24.99, inventory: 40 },
        { name: 'Chapeau Panama', price: 34.99, inventory: 20 },
        { name: 'Écharpe en Laine', price: 29.99, inventory: 45 },
        { name: 'Ceinture en Cuir', price: 39.99, inventory: 70 },
        { name: 'Montre Classique', price: 149.99, inventory: 15 },
        { name: 'Bottes en Cuir', price: 99.99, inventory: 40 },
        { name: 'Lunettes de Soleil', price:  79.99, inventory: 50 },
        { name: 'Pull-over Gris', price: 64.99, inventory: 35 },
        { name: 'Short en Jean', price: 39.99, inventory: 60 },
        { name: "Sandales d'Été", price: 49.99, inventory: 40 },
        { name: "Bijoux Fantaisie", price: 14.99, inventory: 85 },
        { name: "Pantalon Chino", price: 54.99, inventory: 50 },
        { name: "Blouse Florale", price: 39.99, inventory: 40 },
      ];

      // Insert products into the database
      await this.productRepository.save(products);
    }
  }
}
