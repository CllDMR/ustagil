import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { OrganizationCreateOneCommandDto } from '../create-one/create-one.dto';

export class OrganizationUpdateOneCommandDto extends PartialType(
  OrganizationCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
