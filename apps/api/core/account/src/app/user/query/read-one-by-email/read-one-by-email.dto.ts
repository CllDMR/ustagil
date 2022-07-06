import { IsEmail } from 'class-validator';

export class AccountUserReadOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
