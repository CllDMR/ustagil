import { IsNumber, IsOptional } from 'class-validator';

export class BaseFindAllMSMessage {
  @IsNumber()
  @IsOptional()
  page_size?: number;

  constructor(page_size?: number) {
    this.page_size = page_size;
  }

  toString() {
    return JSON.stringify({
      page_size: this.page_size,
    });
  }
}
