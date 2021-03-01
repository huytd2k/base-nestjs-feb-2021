import { HeaderValueEnum } from '../enums/header-value.enum';
import { HeaderEnum } from '../enums/header.enum';

export const invalidHeader = {
  [HeaderEnum.STATUS_REASON]: HeaderValueEnum.VALIDATION_FAILED,
};
