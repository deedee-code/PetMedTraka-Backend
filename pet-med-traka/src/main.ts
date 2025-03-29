import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);

  //swagger configuration

  const config = new DocumentBuilder()
    .setTitle('PET-MED-TRAKA') // Title of API documentation
    .setDescription('API description') // Description of the API
    .setVersion('1.0') // API version
    .addBearerAuth() // Enables JWT Bearer token authentication
    .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
