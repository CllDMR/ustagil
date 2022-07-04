import { IsString } from 'class-validator';

export class SuperAdminRegisterDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
