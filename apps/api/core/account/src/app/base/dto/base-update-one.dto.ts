import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { BaseCreateOneDto } from './base-create-one.dto';

export class BaseUpdateOneDto extends PartialType(BaseCreateOneDto) {
  @IsMongoId()
  id: string;
}
