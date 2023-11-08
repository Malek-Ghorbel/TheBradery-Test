import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>
  ){}

  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { userId, totalAmount, productDetails } = createTransactionDto;

    // Create and save the new transaction with the provided data
    const newTransaction = this.transactionRepository.create({
      userId,
      totalAmount,
      productDetails,
    });

    return this.transactionRepository.save(newTransaction);  
  }

  findAll(): Promise<Transaction[]>{
    return this.transactionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
