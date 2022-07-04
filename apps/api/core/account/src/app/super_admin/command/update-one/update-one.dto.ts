import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { SuperAdminCreateOneDto } from '../create-one/create-one.dto';

export class SuperAdminUpdateOneDto extends PartialType(
  SuperAdminCreateOneDto
) {
  @IsMongoId()
  id: string;
}
