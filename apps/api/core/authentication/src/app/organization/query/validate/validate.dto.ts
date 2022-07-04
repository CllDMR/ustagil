import { IsString } from 'class-validator';

export class OrganizationValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
