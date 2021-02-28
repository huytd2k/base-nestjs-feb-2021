import { ApiProperty } from '@nestjs/swagger';
import { BaseDtoResult } from 'src/common/base/base-dto-result.dto';
import { ValidationFieldError } from 'src/common/types/validation-errors';
import { CreateUserValidateFieldError } from '../types/create-user-validate-field-error';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user.dto';
export class CreateUserResultDto extends BaseDtoResult<CreateUserDto> {
  user: UserDto;
  @ApiProperty({ type: [CreateUserValidateFieldError] })
  validateErrors?: ValidationFieldError<CreateUserDto>[];
}
