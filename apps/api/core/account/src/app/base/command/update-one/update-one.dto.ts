import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { BaseCreateOneCommandDto } from '../create-one/create-one.dto';

export class BaseUpdateOneCommandDto extends PartialType(
  BaseCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
