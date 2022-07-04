import { IsString } from 'class-validator';

export class SuperAdminCreateOneDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
