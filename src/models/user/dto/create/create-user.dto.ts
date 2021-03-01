import { IsEmail, IsString, Matches } from 'class-validator';
import { ValidateUserRegex } from '../../consts/validate-regexs';

export class CreateUserDto {
  @IsString()
  @Matches(ValidateUserRegex.VALIDATE_USERNAME_REGEX)
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
