import { IsNumber, IsOptional } from 'class-validator';

export class OrganizationFindAllQueryDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;
}
