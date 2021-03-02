export class LoginSuccessResultDto {
  access_token: string;
  refresh_token: string;
  iat: number;
  access_token_exp: number;
  refresh_token_exp: number;
}
