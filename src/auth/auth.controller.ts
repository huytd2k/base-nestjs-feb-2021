import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login/dto/login.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() request) {
    return request.user;
  }
}
