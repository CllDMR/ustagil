import { IsString } from 'class-validator';

export class OrganizationRegisterDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
