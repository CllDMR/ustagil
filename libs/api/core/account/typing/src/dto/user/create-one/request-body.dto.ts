import { IsString } from 'class-validator';

export class AccountUserCreateOneRequestBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
