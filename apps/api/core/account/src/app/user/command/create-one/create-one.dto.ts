import { IsString } from 'class-validator';

export class AccountUserCreateOneCommandDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
