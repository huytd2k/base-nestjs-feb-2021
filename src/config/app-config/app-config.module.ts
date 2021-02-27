import { Module } from '@nestjs/common';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigService {}
