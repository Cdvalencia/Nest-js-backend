import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [    
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'libreria',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true, // Solo para desarrollo, desactivar en producción
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql9.freesqldatabase.com',
      port: 3306,
      username: 'sql9651341',
      password: 'hflS6IwPfQ',
      database: 'sql9651341',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo, desactivar en producción
    }),
    AuthModule,  
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
