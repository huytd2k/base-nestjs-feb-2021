import { Request } from 'express';

export class TokenHelper {
  static extractRefreshTokenFromRequest(req: Request) {
    return req.cookies?.refresh_token || req.body?.refresh_token;
  }
}
