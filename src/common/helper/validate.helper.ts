import { validateSync } from 'class-validator';
import { ValidationErrors } from '../types/validation-errors';
import { ErrorHelper } from './errors.helper';

export class ValidateHelper {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static validate<T>(object: object): ValidationErrors<T> {
    const errors = validateSync(object);
    return ErrorHelper.mapValidateErrors<T>(errors);
  }
}
