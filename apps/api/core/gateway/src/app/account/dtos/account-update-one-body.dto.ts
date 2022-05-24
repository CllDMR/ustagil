import { PartialType } from '@nestjs/mapped-types';
import { AccountCreateOneBodyDto } from './account-create-one-body.dto';

export class AccountUpdateOneBodyDto extends PartialType(
  AccountCreateOneBodyDto
) {}
