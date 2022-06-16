import { IQuery } from '@nestjs/cqrs';
import { AccountFindAllDto } from '../../dto/account-find-all.dto';

export class AccountReadAllQuery implements IQuery {
  constructor(public readonly dto: AccountFindAllDto) {}
}
