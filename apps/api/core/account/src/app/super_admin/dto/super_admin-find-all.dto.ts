import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SuperAdminFindAllDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;

  @IsString()
  @IsOptional()
  page_token?: string;
}
