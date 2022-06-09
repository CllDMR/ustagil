import { PartialType } from '@nestjs/mapped-types';
import { UserCreateOneBodyDto } from './user-create-one-body.dto';

export class UserUpdateOneBodyDto extends PartialType(UserCreateOneBodyDto) {}
