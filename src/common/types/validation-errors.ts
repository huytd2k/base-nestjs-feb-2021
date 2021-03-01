import { ApiProperty } from '@nestjs/swagger';

export abstract class ValidationErrors<T> {
  validateErrors: ValidationFieldError<T>[];
}

export abstract class ValidationFieldError<T> {
  field: keyof T;
  @ApiProperty({ type: [String] })
  errors: Record<string, string>;
}
