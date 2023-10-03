import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'libreria',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // Solo para desarrollo, desactivar en producción
}),BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
