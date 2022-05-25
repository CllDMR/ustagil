import { IsEmail } from 'class-validator';

export class SuperAdminFindOneByEmailDto {
  @IsEmail()
  email: string;
}
