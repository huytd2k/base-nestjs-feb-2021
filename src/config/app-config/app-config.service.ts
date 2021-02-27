import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 *
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('APP_ENV');
  }
  get url(): string {
    return this.configService.get<string>('APP_URL');
  }
  get port(): number {
    return Number(this.configService.get<number>('APP_PORT'));
  }
}
