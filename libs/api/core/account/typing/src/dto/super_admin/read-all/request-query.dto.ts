import { IsMongoId, IsNumberString, IsOptional } from 'class-validator';

export class AccountSuperAdminReadAllRequestQueryDto {
  @IsNumberString()
  @IsOptional()
  page_size?: number;

  @IsMongoId()
  @IsOptional()
  next_page_cursor?: string;
}
