import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AccountFindAllDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;

  @IsString()
  @IsOptional()
  page_token?: string;
}
