import { IsEmail, IsString } from 'class-validator';

export class AuthenticationBaseRegisterRequestBodyDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  organization: string;
}
