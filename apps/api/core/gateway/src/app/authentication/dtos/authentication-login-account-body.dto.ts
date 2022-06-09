import { IsEmail, IsString } from 'class-validator';

export class AuthenticationLoginAccountBodyDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
