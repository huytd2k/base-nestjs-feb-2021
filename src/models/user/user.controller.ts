import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateUserResultDto } from './dto/create-user-result.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsernameNotFoundException } from './exceptions/username-not-found.exception';
import { CreateUserValidatePipe } from './pipes/create-user-validate.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(CreateUserValidatePipe)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResultDto> {
    const user = await this.userService.create(createUserDto);
    return {
      sucess: true,
      user,
    };
  }

  @Get(':username')
  async getByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new UsernameNotFoundException();

    return {
      user,
    };
  }
}
