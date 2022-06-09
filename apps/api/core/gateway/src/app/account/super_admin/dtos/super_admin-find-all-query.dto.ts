import { IsNumber, IsOptional } from 'class-validator';

export class SuperAdminFindAllQueryDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
