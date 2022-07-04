import { IsString } from 'class-validator';

export class BaseCreateOneRequestBodyDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
