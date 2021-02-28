import { ValidationFieldError } from '../types/validation-errors';

export abstract class BaseDtoResult<T> {
  sucess: boolean;
  validateErrors?: ValidationFieldError<T>[] | any;
}
