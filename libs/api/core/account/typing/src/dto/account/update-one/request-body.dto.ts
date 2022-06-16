import { PartialType } from '@nestjs/mapped-types';
import { AccountCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class AccountUpdateOneRequestBodyDto extends PartialType(
  AccountCreateOneRequestBodyDto
) {}
