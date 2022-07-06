import { IsString } from 'class-validator';

export class AccountOrganizationCreateOneRequestBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
