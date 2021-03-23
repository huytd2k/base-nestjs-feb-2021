import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as morgan from 'morgan';
import * as path from 'path';
import { AppConfigService } from 'src/config/app-config/app-config.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly appConfigService: AppConfigService) {}
  private isDevelopmentMode = this.appConfigService.env == 'development';
  private logger = new Logger('HTTP Request');

  use = this.isDevelopmentMode
    ? morgan('dev', {
        stream: {
          write: (message) => {
            this.logger.log(message.replace('\n', ''));
          },
        },
      })
    : morgan('combined', {
        stream: createWriteStream(path.resolve(process.cwd(), 'access.log'), {
          flags: 'a',
        }),
      });
}
