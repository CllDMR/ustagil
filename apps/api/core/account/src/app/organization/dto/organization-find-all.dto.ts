import { IsNumber, IsOptional } from 'class-validator';

export class OrganizationFindAllDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
