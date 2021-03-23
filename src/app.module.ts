import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HelperModule } from './common/helper/helper.module';
import { AppConfigModule } from './config/app-config/app-config.module';
import { appConfigSchema } from './config/app-config/app-config.schema';
import { DbConfigModule } from './config/db-config/db-config.module';
import { dbConfigSchema } from './config/db-config/db-config.schema';
import { DbConfigService } from './config/db-config/db-config.service';
import { JwtConfigModule } from './config/jwt-config/jwt-config.module';
import { jwtConfigSchema } from './config/jwt-config/jwt-config.schema';
import { LoggerMiddleware } from './middleware/http-log.middleware';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      validationSchema: Joi.object({
        ...appConfigSchema,
        ...dbConfigSchema,
        ...jwtConfigSchema,
      }),
    }),
    DbConfigModule,
    JwtConfigModule,
    AppConfigModule,
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
    AuthModule,
    HelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
