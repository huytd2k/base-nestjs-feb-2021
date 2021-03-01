import { string } from 'joi';

export class LoginDto {
  username: string;
  password: string;
}
