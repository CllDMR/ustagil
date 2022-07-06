import { PartialType } from '@nestjs/mapped-types';
import { AccountSuperAdminCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class AccountSuperAdminUpdateOneRequestBodyDto extends PartialType(
  AccountSuperAdminCreateOneRequestBodyDto
) {}
