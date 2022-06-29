import { PartialType } from '@nestjs/mapped-types';
import { BaseCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class BaseUpdateOneRequestBodyDto extends PartialType(
  BaseCreateOneRequestBodyDto
) {}
