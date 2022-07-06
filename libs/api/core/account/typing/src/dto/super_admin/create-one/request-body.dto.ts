import { IsString } from 'class-validator';

export class AccountSuperAdminCreateOneRequestBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
