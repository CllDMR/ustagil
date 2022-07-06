import { IsString } from 'class-validator';

export class AuthenticationUserValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
