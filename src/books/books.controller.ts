import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
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
}