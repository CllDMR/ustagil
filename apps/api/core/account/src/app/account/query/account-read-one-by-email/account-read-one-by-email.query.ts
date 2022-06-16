import { IQuery } from '@nestjs/cqrs';
import { AccountFindOneByEmailDto } from '../../dto';

export class AccountReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: AccountFindOneByEmailDto) {}
}
