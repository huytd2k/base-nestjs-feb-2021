import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import { ValidationErrors } from '../types/validation-errors';
import { ErrorHelper } from './errors.helper';

@Injectable()
export class ValidateHelper {
  constructor(private readonly _errorHelper: ErrorHelper) {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  validate<T>(object: object): ValidationErrors<T> {
    const errors = validateSync(object);
    return this._errorHelper.mapValidateErrors<T>(errors);
  }
}
