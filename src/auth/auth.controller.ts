import {
  Controller,
  Get,
  Post,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { UserDto } from 'src/models/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginSuccessResultDto } from './login/dtos/login-success-result.dto';
import { LoginDto } from './login/dtos/login.dto';
import { RefreshTokenGuard } from './refresh-token.guard';
import { RefreshTokenDto } from './refresh-token/refresh-token.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: LoginSuccessResultDto })
  async login(
    @User() user: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginResult = await this._authService.login(user);
    const { refresh_token } = loginResult;

    res.cookie('refresh_token', refresh_token, { httpOnly: true });
    res.json(loginResult);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@User() user) {
    return user;
  }

  @Post('refresh_token')
  @UseGuards(RefreshTokenGuard)
  @ApiBody({ type: RefreshTokenDto })
  async refreshToken(@User() user) {
    return this._authService.issueNewToken(user);
  }
}
