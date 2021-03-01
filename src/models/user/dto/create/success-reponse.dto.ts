import { BaseDtoResult } from 'src/common/base/base-dto-result.dto';
import { UserDto } from '../user.dto';
export class CreateUserSuccessDto extends BaseDtoResult {
  user: UserDto;
}
