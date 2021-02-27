import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfigSchema } from './config/app-config/app-config.schema';
import { AppConfigService } from './config/app-config/app-config.service';
import { DbConfigModule } from './config/db-config/db-config.module';
import { dbConfigSchema } from './config/db-config/db-config.schema';
import { DbConfigService } from './config/db-config/db-config.service';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      validationSchema: Joi.object({ ...appConfigSchema, ...dbConfigSchema }),
    }),
    AppConfigService,
    DbConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useFactory: (dbConfigService: DbConfigService) => ({
        type: 'mysql',
        host: dbConfigService.mysqlHost,
        port: dbConfigService.mysqlPort,
        username: dbConfigService.mysqlUsername,
        database: dbConfigService.mysqlDatabase,
        password: dbConfigService.mysqlPassword,
        autoLoadEntities: true, //* TRY AUTO LOAD ENTITIES
        entities: [__dirname + 'models/**/*.entity{.js, .ts}'],
        // synchronize: true,
      }),
      inject: [DbConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
