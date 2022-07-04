import { IsEmail } from 'class-validator';

export class OrganizationFindOneByEmailQueryDto {
  @IsEmail()
  email: string;
}
