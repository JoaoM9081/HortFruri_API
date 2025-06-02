import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: true,  
    credentials: true,              
  });

  const config = new DocumentBuilder()
  .setTitle('HortiFruti API')
  .setDescription('Documentação da API com Swagger')
  .setVersion('1.0')
  .addCookieAuth('cookieAuth', {   // 
      type: 'apiKey',
      in: 'cookie',
      name: 'Authentication',         
    }, 'cookieAuth',)
  .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      requestCredentials: 'include',  
    }
  });

  await app.listen(3000);

}
bootstrap();