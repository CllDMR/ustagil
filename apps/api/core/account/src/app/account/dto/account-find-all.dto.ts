import { IsNumber, IsOptional } from 'class-validator';

export class AccountFindAllDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
