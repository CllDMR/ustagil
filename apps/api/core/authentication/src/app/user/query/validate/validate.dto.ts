import { IsString } from 'class-validator';

export class UserValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
