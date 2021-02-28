import { ValidationFieldError } from 'src/common/types/validation-errors';
import { CreateUserDto } from '../dto/create-user.dto';

export class CreateUserValidateFieldError extends ValidationFieldError<CreateUserDto> {}
