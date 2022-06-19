import { PartialType } from '@nestjs/mapped-types';
import { UserCreateOneRequestBodyDto } from '../create-one/request-body.dto';

export class UserUpdateOneRequestBodyDto extends PartialType(
  UserCreateOneRequestBodyDto
) {}
