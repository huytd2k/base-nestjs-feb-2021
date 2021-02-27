import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbConfigService } from './db-config.service';

@Module({
  imports: [ConfigModule],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DbConfigModule {}
