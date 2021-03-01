import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create/create-user.dto';
import { CreateUserSuccessDto } from './dto/create/success-reponse.dto';
import { CreateUserValidateFailDto } from './dto/create/validate-fail-reponse.dto';
import { UsernameNotFoundException } from './exceptions/username-not-found.exception';
import { UserExceptionFilter } from './filters/user-exception.filter';
import { CreateUserValidatePipe } from './pipes/create-user-validate.pipe';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(UserExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UsePipes(CreateUserValidatePipe)
  @ApiResponse({ status: 201, type: CreateUserSuccessDto })
  @ApiResponse({ status: 400, type: CreateUserValidateFailDto })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserSuccessDto> {
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
