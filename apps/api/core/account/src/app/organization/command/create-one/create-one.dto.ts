import { IsString } from 'class-validator';

export class AccountOrganizationCreateOneCommandDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
