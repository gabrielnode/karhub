import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ErrorInterceptor());
  const config = new DocumentBuilder()
    .setTitle('API Beers Styles')
    .setDescription(
      'Sabia que cada estilo tem uma temperatura ideal de consumo? Isso mesmo, em uma temperatura ideal sua breja fica mais saborosa 😮!',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
