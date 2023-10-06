import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  // app.enableCors({
  //   origin: 'http://localhost:3001',
  //   credentials: true
  // })

  const options = new DocumentBuilder()
    .setTitle('API de libros')    
    .setDescription('API para administrar libros')    
    .setVersion('1.0')
    .build();  

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
