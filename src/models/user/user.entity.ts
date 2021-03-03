import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Entity({ name: 'user' })
@Exclude()
export class UserEntity extends BaseEntity<UserEntity, UserDto> {
  dtoClass = UserDto;

  @Column({ name: 'username', type: 'varchar', length: 255 })
  @Expose()
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  @Expose()
  email: string;
}
