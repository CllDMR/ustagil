import { IsEmail, IsString } from 'class-validator';

export class AuthenticationUserRegisterRequestBodyDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  organization: string;
}
