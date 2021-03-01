import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoHelper } from 'src/common/helper/crypto.helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private _logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposity: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = new UserEntity(createUserDto);
    try {
      newUser.hashPassword();
      const savedUser = await this.userReposity.save(newUser);

      return savedUser.toDto();
    } catch (error) {
      this._logger.error(error.message);
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userReposity.findOne({
      username,
    });
    if (!user) return false;

    const { password: hashedPassword } = user;

    return CryptoHelper.compareHash(password, hashedPassword);
  }

  async findById(id: string): Promise<UserDto> {
    const foundUser = await this.userReposity.findOne(id);
    return foundUser && foundUser.toDto();
  }

  async findByUsername(username: string): Promise<UserDto> {
    const foundUser = await this.userReposity.findOne({ username });
    return foundUser && foundUser.toDto();
  }

  async findByEmail(email: string): Promise<UserDto> {
    const foundUser = await this.userReposity.findOne({ email });
    return foundUser && foundUser.toDto();
  }
}
