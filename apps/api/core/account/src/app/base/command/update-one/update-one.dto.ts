import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { BaseCreateOneDto } from '../create-one/create-one.dto';

export class BaseUpdateOneDto extends PartialType(BaseCreateOneDto) {
  @IsMongoId()
  id: string;
}
