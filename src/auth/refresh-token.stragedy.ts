import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { TokenHelper } from 'src/common/helper/token.helper';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _jwtConfigService: JwtConfigService,
    private readonly _tokenHelper: TokenHelper,
  ) {
    super({
      jwtFromRequest: _tokenHelper.extractRefreshTokenFromRequest,
      ignoreExpiration: false,
      secretOrKey: _jwtConfigService.secretKey,
    });
  }

  async validate(payload: any) {
    const old_access_token = payload.access_token;
    const decodedAccessToken = this._jwtService.decode(old_access_token);
    return {
      id: decodedAccessToken['id'],
      username: decodedAccessToken['username'],
    };
  }
}
