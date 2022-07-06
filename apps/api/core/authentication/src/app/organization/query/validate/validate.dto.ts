import { IsString } from 'class-validator';

export class AuthenticationOrganizationValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
