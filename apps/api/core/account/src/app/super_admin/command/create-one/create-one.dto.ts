import { IsString } from 'class-validator';

export class AccountSuperAdminCreateOneCommandDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
