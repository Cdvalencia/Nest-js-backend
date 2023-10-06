/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './books.entity';
import { validate } from 'class-validator';
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<Books[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Books> {
    return this.booksService.findOne(id);
  } 

  @Post()
  async create(
    @Body() bookData: Books    
  ): Promise<Books> {  

    const book = Object.assign(new Books(), bookData);    
    
    const errors = await validate(book);
    if (errors.length > 0) {      
      throw new HttpException({ message: 'Hay campos que están vacios.', errors }, HttpStatus.BAD_REQUEST);
    }
   
    return this.booksService.create(bookData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() bookData: Books): Promise<Books> {
    const book = Object.assign(new Books(), bookData);    
    
    const errors = await validate(book);
    if (errors.length > 0) {      
      throw new HttpException({ message: 'Hay campos que están vacios.', errors }, HttpStatus.BAD_REQUEST);
    }
   
    return this.booksService.update(+id, bookData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }





  @Post('search')
  searchBooks(
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('genre') genre: string,
    @Body('start_date') start_date: string,
    @Body('end_date') end_date: string,
    
    @Body('globalFilter') globalFilter: number,
    @Body('sorting') sorting: number,
    @Body('pageIndex') pageIndex: number,
    @Body('pageSize') pageSize: number
  ) {
    let data={
      id,
      title,
      author,
      genre,
      start_date,
      end_date,
      
      sorting,
      pageIndex,
      pageSize
    }      
    return this.booksService.findBooks(data);
  }

  @Post('deleteAll')
  deleteAllBooks(
    @Body('books') books: number[] 
  ) {  
    console.log(books);    
    return this.booksService.removeMany(books);  
  }
}