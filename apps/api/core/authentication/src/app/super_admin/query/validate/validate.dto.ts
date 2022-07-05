import { IsString } from 'class-validator';

export class AuthenticationSuperAdminValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
