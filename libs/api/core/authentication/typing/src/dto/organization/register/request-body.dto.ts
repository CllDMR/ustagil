import { IsEmail, IsString } from 'class-validator';

export class AuthenticationOrganizationRegisterRequestBodyDto {
  @IsString()
  displayName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  organization: string;
}
