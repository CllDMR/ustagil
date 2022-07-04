import { IsEmail } from 'class-validator';

export class SuperAdminFindOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
