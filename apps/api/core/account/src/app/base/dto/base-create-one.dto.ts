import { IsString } from 'class-validator';

export class BaseCreateOneDto {
  @IsString()
  displayName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
