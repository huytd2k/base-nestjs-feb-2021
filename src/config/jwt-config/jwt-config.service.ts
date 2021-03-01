import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }
  get expiredTimeSec(): number {
    return Number(
      this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRED_SECOND'),
    );
  }
}
