import { IsNumber, IsOptional } from 'class-validator';

export class AccountFindAllQueryDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
