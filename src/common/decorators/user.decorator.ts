import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/models/user/dto/user.dto';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserDto | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDto | null;
  },
);
