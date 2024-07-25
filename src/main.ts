 import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ApiExceptionFilter } from './exceptions/api-exception.filter';
import { ValidationPipe } from '@nestjs/common';
 
async function bootstrap() {
 
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions:{
      enableImplicitConversion:true,
    }
  }));
  const options = new DocumentBuilder()
  .setTitle('AdminDashboard Module')
  .setDescription('AdminDashboard Module')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, options);

SwaggerModule.setup('docs', app, document);
await app.listen( 4000, '0.0.0.0');
}
bootstrap();
