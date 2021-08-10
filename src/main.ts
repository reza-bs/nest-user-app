import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
  .setTitle("Users")
  .setDescription("The user API documentation")
  .setVersion('1.0')
  .build();

  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document)
  await app.listen(3000);
}
bootstrap();
