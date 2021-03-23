import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../src/auth/auth.service';
import { mockAuthServiceFactory } from './mockAuthServiceFactory';
import { mockJwtServiceFactory } from './mockJwtServiceFactory';

export const mockAuthSreviceProvider: Provider = {
  provide: AuthService,
  useFactory: mockAuthServiceFactory,
};

export const mockJwtServiceProvider: Provider = {
  provide: JwtService,
  useFactory: mockJwtServiceFactory,
};
