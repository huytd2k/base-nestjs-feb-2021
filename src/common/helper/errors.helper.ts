import { ValidationError } from 'class-validator';
import { ValidationErrors } from '../types/validation-errors';

export class ErrorHelper {
  /**
   * Mapping errors from `class-validator` type to custom type
   */
  static mapValidateErrors<T>(errs: ValidationError[]): ValidationErrors<T> {
    return {
      validateErrors: errs.map((err) => ({
        field: err.property,
        errors: err.constraints,
      })) as any,
    };
  }
}
