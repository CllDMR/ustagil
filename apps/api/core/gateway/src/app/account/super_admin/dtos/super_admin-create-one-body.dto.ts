import { IsString } from 'class-validator';

export class SuperAdminCreateOneBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
