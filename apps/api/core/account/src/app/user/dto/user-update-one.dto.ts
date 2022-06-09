import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { UserCreateOneDto } from './user-create-one.dto';

export class UserUpdateOneDto extends PartialType(UserCreateOneDto) {
  @IsMongoId()
  id: string;
}
