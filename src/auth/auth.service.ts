import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
import { UserDto } from 'src/models/user/dto/user.dto';
import { UserService } from 'src/models/user/user.service';
import { LoginSuccessResultDto } from './login/dtos/login-success-result.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}
  async validateUser(username: string, password: string) {
    return await this.userService.validateUser(username, password);
  }
  async login(user: UserDto): Promise<LoginSuccessResultDto> {
    const { username, id } = user;
    const payload = { username, id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { access_token: accessToken },
      { expiresIn: '7d' },
    );
    const decodedAccessToken = this.jwtService.decode(accessToken);
    const decodedRefreshToken = this.jwtService.decode(refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      iat: decodedAccessToken['ita'],
      access_token_exp: decodedAccessToken['exp'],
      refresh_token_exp: decodedRefreshToken['exp'],
    };
  }
  async issueNewToken(user: UserDto) {
    const { username, id } = user;
    const payload = { username, id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
