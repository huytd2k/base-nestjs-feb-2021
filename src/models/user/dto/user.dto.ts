import { BaseDto } from 'src/common/base/base.dto';
import { UserEntity } from '../user.entity';

export class UserDto extends BaseDto<UserEntity> {
  constructor(user: UserEntity) {
    super(user);
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
  }
  id?: string;
  username?: string;
  email?: string;
}
