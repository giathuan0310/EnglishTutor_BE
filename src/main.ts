// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

}
bootstrap();
