import { IsString } from 'class-validator';

export class AuthenticationOrganizationRegisterDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  organization: string;
}
