import { PartialType } from '@nestjs/mapped-types';
import { AccountBaseCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class AccountBaseUpdateOneRequestBodyDto extends PartialType(
  AccountBaseCreateOneRequestBodyDto
) {}
