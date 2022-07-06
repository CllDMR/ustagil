import { IsEmail } from 'class-validator';

export class AccountSuperAdminReadOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
