import { Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ValidateHelper } from 'src/common/helper/validate.helper';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { ValidateErrorMessageEnum } from '../enums/validate-error-message.enum';
import { InvalidCreateUserException } from '../exceptions/invalid-create-user.exception';
import { UserService } from '../user.service';

@Injectable()
export class CreateUserValidatePipe implements PipeTransform {
  constructor(
    private readonly _userService: UserService,
    private readonly _validateHelper: ValidateHelper,
  ) {}
  private async _isUsernameExisted(username: string) {
    const user = await this._userService.findByUsername(username);
    return !!user;
  }
  private async _isEmailExisted(email: string) {
    const user = await this._userService.findByEmail(email);
    return !!user;
  }
  /**
   *
   * @param createUserDto : must be transformed to class instance
   */
  private async _validate(createUserDto: CreateUserDto) {
    const { validateErrors } = this._validateHelper.validate<CreateUserDto>(
      createUserDto,
    );

    const isUsernameExisted = await this._isUsernameExisted(
      createUserDto.username,
    );
    const isEmailExisted = await this._isEmailExisted(createUserDto.email);

    if (isUsernameExisted)
      validateErrors.push({
        field: 'username',
        errors: {
          existed: ValidateErrorMessageEnum.USERNAME_EXISTED,
        },
      });

    if (isEmailExisted)
      validateErrors.push({
        field: 'email',
        errors: {
          existed: ValidateErrorMessageEnum.EMAIL_EXISTED,
        },
      });

    return validateErrors;
  }
  async transform(value: CreateUserDto) {
    const createUserDto = plainToClass(CreateUserDto, value);
    const validateErrors = await this._validate(createUserDto);

    if (validateErrors.length) {
      throw new InvalidCreateUserException({
        validateErrors,
      });
    }
    return createUserDto;
  }
}
