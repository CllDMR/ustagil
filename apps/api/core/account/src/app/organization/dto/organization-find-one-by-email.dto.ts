import { IsEmail } from 'class-validator';

export class OrganizationFindOneByEmailDto {
  @IsEmail()
  email: string;
}
