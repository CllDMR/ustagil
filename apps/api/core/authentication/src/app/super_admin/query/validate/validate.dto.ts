import { IsString } from 'class-validator';

export class SuperAdminValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
