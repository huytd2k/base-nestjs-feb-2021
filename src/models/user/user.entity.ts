import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import { CryptoHelper } from 'src/common/helper/crypto.helper';

@Entity({ name: 'user' })
@Exclude()
export class UserEntity extends BaseEntity<UserEntity> {
  getDto() {
    return UserDto;
  }
  @Column({ name: 'username', type: 'varchar', length: 255 })
  @Expose()
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  @Expose()
  email: string;

  toDto(): UserDto {
    return classToPlain(this);
  }

  hashPassword() {
    this.password = CryptoHelper.genHash(this.password);
  }
}
