import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccountUserCreateOneCommandDto } from '../create-one/create-one.dto';

export class AccountUserUpdateOneCommandDto extends PartialType(
  AccountUserCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
