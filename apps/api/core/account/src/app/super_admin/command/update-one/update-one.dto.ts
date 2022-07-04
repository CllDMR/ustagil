import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { SuperAdminCreateOneCommandDto } from '../create-one/create-one.dto';

export class SuperAdminUpdateOneCommandDto extends PartialType(
  SuperAdminCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
