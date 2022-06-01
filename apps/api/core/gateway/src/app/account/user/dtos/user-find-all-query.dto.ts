import { IsNumber, IsOptional } from 'class-validator';

export class UserFindAllQueryDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
