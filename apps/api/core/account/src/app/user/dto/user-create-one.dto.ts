import { IsString } from 'class-validator';

export class UserCreateOneDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
