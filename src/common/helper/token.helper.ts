import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TokenHelper {
  extractRefreshTokenFromRequest(req: Request) {
    return req.cookies?.refresh_token || req.body?.refresh_token;
  }
}
