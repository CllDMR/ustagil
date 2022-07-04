import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { UserCreateOneDto } from '../create-one/create-one.dto';

export class UserUpdateOneDto extends PartialType(UserCreateOneDto) {
  @IsMongoId()
  id: string;
}
