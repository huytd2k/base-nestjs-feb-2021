import { ValidationException } from 'src/common/exceptions/ValidationException';
import { CreateUserValidateErrors } from '../types/create-user-validation-errors';

export class InvalidCreateUserException extends ValidationException {
  constructor(errors: CreateUserValidateErrors) {
    super(errors);
  }
}
