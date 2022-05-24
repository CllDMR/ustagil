import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AccountFindAllQueryDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;

  @IsString()
  @IsOptional()
  page_token?: string;
}
