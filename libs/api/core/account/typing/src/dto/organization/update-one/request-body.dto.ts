import { PartialType } from '@nestjs/mapped-types';
import { AccountOrganizationCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class AccountOrganizationUpdateOneRequestBodyDto extends PartialType(
  AccountOrganizationCreateOneRequestBodyDto
) {}
