import { IsString } from 'class-validator';

export class AccountBaseCreateOneCommandDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
