import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { OrganizationCreateOneDto } from '../create-one/create-one.dto';

export class OrganizationUpdateOneDto extends PartialType(
  OrganizationCreateOneDto
) {
  @IsMongoId()
  id: string;
}
