import { IsString } from 'class-validator';

export class SuperAdminCreateOneRequestBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
