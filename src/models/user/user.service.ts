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
    private readonly _userReposity: Repository<UserEntity>,
    private readonly _cryptoHelper: CryptoHelper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      const hashedPassword = this._cryptoHelper.genHash(createUserDto.password);
      const newUser = new UserEntity({
        ...createUserDto,
        password: hashedPassword,
      });
      const savedUser = await this._userReposity.save(newUser);

      return savedUser.toDto();
    } catch (error) {
      this._logger.error(error.message);
      throw error;
    }
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this._userReposity.findOne({
      username,
    });

    if (user && this._cryptoHelper.compareHash(password, user.password))
      return user.toDto();
    return null;
  }

  async findById(id: string): Promise<UserDto> {
    const foundUser = await this._userReposity.findOne(id);
    return foundUser && foundUser.toDto();
  }

  async findByUsername(username: string): Promise<UserDto> {
    const foundUser = await this._userReposity.findOne({ username });
    return foundUser && foundUser.toDto();
  }

  async findByEmail(email: string): Promise<UserDto> {
    const foundUser = await this._userReposity.findOne({ email });
    return foundUser && foundUser.toDto();
  }
}
