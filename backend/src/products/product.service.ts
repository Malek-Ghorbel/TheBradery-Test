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
}
