import { IsString } from 'class-validator';

export class BaseValidateDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
