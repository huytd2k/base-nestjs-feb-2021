import { ApiProperty } from '@nestjs/swagger';
import { ValidationFieldError } from 'src/common/types/validation-errors';
import { CreateUserDto } from './create-user.dto';
import { UserFields } from '../../enums/user-fields.enum';

export class CreateUserValidateFieldError extends ValidationFieldError<CreateUserDto> {
  @ApiProperty({
    enum: [UserFields.EMAIL, UserFields.PASSWORD, UserFields.USERNAME],
  })
  field: keyof CreateUserDto;
}
