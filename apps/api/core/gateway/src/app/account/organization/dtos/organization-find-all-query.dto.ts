import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class OrganizationFindAllQueryDto {
  @IsNumberString()
  @IsOptional()
  page_size?: number;

  @IsMongoId()
  @IsOptional()
  next_page_cursor?: string;
}
