import { IsString } from 'class-validator';

export class SuperAdminCreateOneDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
