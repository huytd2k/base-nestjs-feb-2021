import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserResultDto } from './dto/create-user-result.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResultDto> {
    const user = await this.userService.create(createUserDto);
    return {
      sucess: true,
      user,
    };
  }
}
