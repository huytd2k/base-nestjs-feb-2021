import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(username: string, password: string) {
    return await this.userService.validateUser(username, password);
  }
}
