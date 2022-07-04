import { IsString } from 'class-validator';

export class SuperAdminCreateOneBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
