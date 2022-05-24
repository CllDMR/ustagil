import { PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccountCreateOneDto } from './account-create-one.dto';

export class AccountUpdateOneDto extends PartialType(AccountCreateOneDto) {
  @IsMongoId()
  id: string;
}
