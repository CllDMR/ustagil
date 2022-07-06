import { IsEmail } from 'class-validator';

export class AccountOrganizationReadOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
