import { PartialType } from '@nestjs/mapped-types';
import { OrganizationCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class OrganizationUpdateOneRequestBodyDto extends PartialType(
  OrganizationCreateOneRequestBodyDto
) {}
