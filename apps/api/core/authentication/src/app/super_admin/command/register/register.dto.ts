import { IsString } from 'class-validator';

export class AuthenticationSuperAdminRegisterDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
