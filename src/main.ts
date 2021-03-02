import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config/app-config.service';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfigService = app.get(AppConfigService);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.enableShutdownHooks();
  app.use(cookieParser('123123'));

  const options = new DocumentBuilder()
    .setTitle('Base')
    .setDescription('Base API Document')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(appConfigService.port);
}
bootstrap();
