import { IsEmail, IsString } from 'class-validator';

export class AuthenticationRegisterAccountBodyDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
