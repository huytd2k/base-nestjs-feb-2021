import { BadRequestException } from '@nestjs/common';
import { CreateUserValidateErrors } from '../types/create-user-validation-errors';

export class InvalidCreateUserException extends BadRequestException {
  constructor(errors: CreateUserValidateErrors) {
    super(errors);
  }
}
