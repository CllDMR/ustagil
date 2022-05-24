import { IsString } from 'class-validator';

export class AuthenticationRegisterAccountBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  organization: string;

  @IsString()
  password: string;
}
