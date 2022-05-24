import { IsEmail } from 'class-validator';

export class AccountFindOneByEmailDto {
  @IsEmail()
  email: string;
}
