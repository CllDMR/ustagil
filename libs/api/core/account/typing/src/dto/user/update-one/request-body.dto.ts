import { PartialType } from '@nestjs/mapped-types';
import { AccountUserCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class AccountUserUpdateOneRequestBodyDto extends PartialType(
  AccountUserCreateOneRequestBodyDto
) {}
