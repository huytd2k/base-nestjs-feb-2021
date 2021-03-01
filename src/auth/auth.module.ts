import { Module } from '@nestjs/common';
import { UserModule } from 'src/models/user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.stragedy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/config/jwt-config/jwt-config.module';
import { JwtConfigService } from 'src/config/jwt-config/jwt-config.service';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secretKey,
        signOptions: {
          expiresIn: jwtConfigService.expiredTimeSec,
        },
      }),
      inject: [JwtConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
