import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {}

  get mysqlPassword(): string {
    return this.configService.get<string>('DB_MYSQL_PASSWORD');
  }
  get mysqlDatabase(): string {
    return this.configService.get<string>('DB_MYSQL_DATABASE');
  }
  get mysqlUsername(): string {
    return this.configService.get<string>('DB_MYSQL_USER');
  }
  get mysqlPort(): number {
    return Number(this.configService.get<number>('DB_MYSQL_PORT'));
  }
  get mysqlHost(): string {
    return this.configService.get<string>('DB_MYSQL_HOST');
  }
}
