import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Para todas las rutas de la app
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    //Use de pipes de validación a nivel global de aplicación 
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  await app.listen(3000);
}
bootstrap();
