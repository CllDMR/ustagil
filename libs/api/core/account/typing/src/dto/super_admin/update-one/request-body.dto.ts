import { PartialType } from '@nestjs/mapped-types';
import { SuperAdminCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class SuperAdminUpdateOneRequestBodyDto extends PartialType(
  SuperAdminCreateOneRequestBodyDto
) {}
