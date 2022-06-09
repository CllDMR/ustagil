import { IsNumber, IsOptional } from 'class-validator';

export class UserFindAllDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
