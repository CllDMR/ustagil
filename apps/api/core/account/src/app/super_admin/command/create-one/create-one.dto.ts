import { IsString } from 'class-validator';

export class SuperAdminCreateOneCommandDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
