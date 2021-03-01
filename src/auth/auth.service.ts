import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/models/user/dto/user.dto';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    return await this.userService.validateUser(username, password);
  }
  async login(user: UserDto) {
    const { username, id } = user;
    const payload = { username, id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
