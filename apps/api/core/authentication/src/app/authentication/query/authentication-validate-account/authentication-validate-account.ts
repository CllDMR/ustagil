import { IsString } from 'class-validator';

export class AuthenticationValidateAccountDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
