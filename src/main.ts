import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
// arquivo que inicia a aplicação NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // se true remove as chaves que estao no DTO
    transform: true, 
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
