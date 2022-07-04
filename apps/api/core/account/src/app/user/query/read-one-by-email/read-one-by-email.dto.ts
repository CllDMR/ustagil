import { IsEmail } from 'class-validator';

export class UserFindOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
