import { IsEmail, IsString } from 'class-validator';

export class RegisterRequestBodyDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  organization: string;
}
