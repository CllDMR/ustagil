import { IsString } from 'class-validator';

export class AuthenticationBaseValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
