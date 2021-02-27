import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposity: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = new UserEntity(createUserDto);
    try {
      const savedUser = await this.userReposity.save(newUser);
      return savedUser.toDto();
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
}
