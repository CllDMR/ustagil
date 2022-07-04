import { IsString } from 'class-validator';

export class AuthenticationRegisterAccountDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
