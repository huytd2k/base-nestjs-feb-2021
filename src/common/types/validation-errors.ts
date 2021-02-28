export abstract class ValidationErrors<T> {
  validateErrors: ValidationFieldError<T>[];
}

export abstract class ValidationFieldError<T> {
  field: keyof T;
  errors: Record<string, string>;
}
