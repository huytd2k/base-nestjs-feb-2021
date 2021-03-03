import { Injectable } from '@nestjs/common';
import { ValidationError as ClassValidatorError } from 'class-validator';
import { ValidationErrors } from '../types/validation-errors';

@Injectable()
export class ErrorHelper {
  /**
   * Mapping errors from `class-validator` type to custom type
   */
  mapValidateErrors<T>(errs: ClassValidatorError[]): ValidationErrors<T> {
    return {
      validateErrors: errs.map((err) => ({
        field: err.property,
        errors: err.constraints,
      })) as any,
    };
  }
}
