import { PartialType } from '@nestjs/mapped-types';
import { OrganizationCreateOneBodyDto } from './organization-create-one-body.dto';

export class OrganizationUpdateOneBodyDto extends PartialType(
  OrganizationCreateOneBodyDto
) {}
