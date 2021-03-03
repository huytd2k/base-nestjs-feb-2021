import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { UserDto } from 'src/models/user/dto/user.dto';
import { UserService } from 'src/models/user/user.service';
import { LoginSuccessResultDto } from './login/dtos/login-success-result.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _jwtConfigService: JwtConfigService,
  ) {}
  async getUserInfoByUsername(username: string) {
    return await this._userService.findByUsername(username);
  }
  async validateUser(username: string, password: string) {
    return await this._userService.validateUser(username, password);
  }
  async login(user: UserDto): Promise<LoginSuccessResultDto> {
    const { username, id } = user;
    const payload = { username, id };
    const accessToken = this._jwtService.sign(payload);
    const refreshToken = this._jwtService.sign(
      { access_token: accessToken },
      { expiresIn: '7d' }, // TODO: Add config for refresh_token
    );
    const decodedAccessToken = this._jwtService.decode(accessToken);
    const decodedRefreshToken = this._jwtService.decode(refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      iat: decodedAccessToken['ita'],
      access_token_exp: decodedAccessToken['exp'],
      refresh_token_exp: decodedRefreshToken['exp'],
    };
  }
  async issueNewToken(username: string, id: string) {
    const payload = { username, id };
    const accessToken = this._jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
