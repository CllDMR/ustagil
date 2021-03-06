import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class AccountUserReadAllQueryDto {
  @IsNumber()
  @IsOptional()
  page_size?: number;

  @IsMongoId()
  @IsOptional()
  next_page_cursor?: string;
}
