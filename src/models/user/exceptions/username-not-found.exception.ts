import { ValidationException } from 'src/common/exceptions/ValidationException';
import { ExceptionMessageEnum } from '../enums/exception-message.enum';

export class UsernameNotFoundException extends ValidationException {
  constructor() {
    super(ExceptionMessageEnum.USERNAME_NOT_FOUND);
  }
}
