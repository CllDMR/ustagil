import { IsNumber, IsOptional } from 'class-validator';

export class SuperAdminFindAllDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
