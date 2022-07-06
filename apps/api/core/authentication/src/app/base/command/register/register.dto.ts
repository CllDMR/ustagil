import { IsString } from 'class-validator';

export class AuthenticationBaseRegisterDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
