/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './books.entity';

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
  create(@Body() book: Books): Promise<Books> {    
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Books): Promise<Books> {
    return this.booksService.update(+id, book);
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