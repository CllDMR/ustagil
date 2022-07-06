import { IsString } from 'class-validator';

export class AuthenticationUserRegisterDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
