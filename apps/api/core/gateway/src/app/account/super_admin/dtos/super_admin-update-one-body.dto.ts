import { PartialType } from '@nestjs/mapped-types';
import { SuperAdminCreateOneBodyDto } from './super_admin-create-one-body.dto';

export class SuperAdminUpdateOneBodyDto extends PartialType(
  SuperAdminCreateOneBodyDto
) {}
