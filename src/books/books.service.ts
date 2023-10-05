import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Between, In } from 'typeorm';
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

  async findBooks(data): Promise<any> {
    let order={};
    console.log(data.start_date,data.end_date);
    
    if(data.sorting && data.sorting.id){
      order[data.sorting.id]=(data.sorting.desc)?"DESC":"ASC";
    }
    let where: any=
      { 
        id: (data.id!="")?Like('%' + data.id + '%'):null,        
        title: Like('%' + data.title + '%'),
        author: Like('%' + data.author + '%'),
        genre: Like('%' + data.genre + '%'),
      }      
    ;
    
    if(data.start_date!="" && data.end_date!=""){
      where.publication_date= Between(new Date(data.start_date),new Date(data.end_date))
    }

       
    console.log(where);
    const [result, total] = await this.bookRepository.findAndCount(
      {
        where,
        order: order,
        take: data.pageSize,
        skip: data.pageIndex*data.pageSize
      }
    );    

    return {
        data: result,
        count: total
    }
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

  async removeAll(ids: number[]): Promise<void> {      
    await this.bookRepository.createQueryBuilder()
      .delete()
      .from(Books)
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async removeMany(ids: number[]) {
    const entities = await this.bookRepository.findBy({ id: In(ids) });
    if (!entities) {
      throw new NotFoundException(`Some Entities not found, no changes applied!`);
    }
    return this.bookRepository.remove(entities);
  }
}