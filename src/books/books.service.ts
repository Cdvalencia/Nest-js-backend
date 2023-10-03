import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private readonly bookRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Books> {
    return this.bookRepository.findOneBy({id});
  }

  async create(book: Books): Promise<Books> {    
    return this.bookRepository.save(book);
  }

  async update(id: number, book: Books): Promise<Books> {
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}