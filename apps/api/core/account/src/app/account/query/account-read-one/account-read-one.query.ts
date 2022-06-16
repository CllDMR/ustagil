import { IQuery } from '@nestjs/cqrs';
import { AccountFindOneDto } from '../../dto/account-find-one.dto';

export class AccountReadOneQuery implements IQuery {
  constructor(public readonly dto: AccountFindOneDto) {}
}
