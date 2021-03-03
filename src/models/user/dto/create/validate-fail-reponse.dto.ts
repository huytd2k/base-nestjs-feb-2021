import { ApiProperty } from '@nestjs/swagger';
import { BaseDtoResult } from 'src/common/base/base-dto-result.dto';
import { CreateUserValidateFieldError } from './field-validate-error.dto';

export class CreateUserValidateFailDto extends BaseDtoResult {
  @ApiProperty({ type: [CreateUserValidateFieldError] })
  validate_errors: CreateUserValidateFieldError[];
}
