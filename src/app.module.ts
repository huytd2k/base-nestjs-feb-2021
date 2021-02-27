import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfigSchema } from './config/app-config/app-config.schema';
import { AppConfigService } from './config/app-config/app-config.service';
import { DbConfigModule } from './config/db-config/db-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      validationSchema: Joi.object({ ...appConfigSchema }),
    }),
    AppConfigService,
    DbConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
