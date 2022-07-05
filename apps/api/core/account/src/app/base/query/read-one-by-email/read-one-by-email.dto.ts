import { IsEmail } from 'class-validator';

export class AccountBaseReadOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
