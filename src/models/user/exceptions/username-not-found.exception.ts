import { NotFoundException } from '@nestjs/common';
import { ExceptionMessageEnum } from '../enums/exception-message.enum';

export class UsernameNotFoundException extends NotFoundException {
  constructor() {
    super(ExceptionMessageEnum.USERNAME_NOT_FOUND);
  }
}
