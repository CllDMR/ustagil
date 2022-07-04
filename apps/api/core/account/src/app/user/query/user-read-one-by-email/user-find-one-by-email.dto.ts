import { IsEmail } from 'class-validator';

export class UserFindOneByEmailDto {
  @IsEmail()
  email: string;
}
