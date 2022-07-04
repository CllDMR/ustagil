import { IsString } from 'class-validator';

export class UserCreateOneBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
