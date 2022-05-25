import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SuperAdminFindAllMSMessage {
  @IsNumber()
  @IsOptional()
  page_size?: number;

  @IsString()
  @IsOptional()
  page_token?: string;

  constructor(page_size?: number, page_token?: string) {
    this.page_size = page_size;
    this.page_token = page_token;
  }

  toString() {
    return JSON.stringify({
      page_size: this.page_size,
      page_token: this.page_token,
    });
  }
}
