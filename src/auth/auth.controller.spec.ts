import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockAuthSreviceProvider,
  mockJwtServiceProvider,
} from '../../test/mocks/services/providers';
import { resMockFactory } from '../../test/mocks/testUtils';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authcontroller: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [mockAuthSreviceProvider, mockJwtServiceProvider],
    }).compile();

    authcontroller = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);
  });

  describe('login', () => {
    describe('happy case:', () => {
      it('should call _authService.login() and return result', async () => {
        const resMock = resMockFactory();
        const mockUser = { username: 'huy123', password: 'huy221100' };
        const mockLoginResult = {
          access_token: '12345',
          refresh_token: '1234',
        };
        authService.login = jest.fn().mockResolvedValue(mockLoginResult);

        await authcontroller.login(mockUser as any, resMock as any);

        expect(resMock.cookie).toBeCalledTimes(1);
        expect(resMock.json).toBeCalledTimes(1);
      });
    });
  });
});
