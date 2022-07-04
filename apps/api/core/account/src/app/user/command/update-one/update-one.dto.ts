import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { UserCreateOneCommandDto } from '../create-one/create-one.dto';

export class UserUpdateOneCommandDto extends PartialType(
  UserCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
