import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccountSuperAdminCreateOneCommandDto } from '../create-one/create-one.dto';

export class AccountSuperAdminUpdateOneCommandDto extends PartialType(
  AccountSuperAdminCreateOneCommandDto
) {
  @IsMongoId()
  id: string;
}
