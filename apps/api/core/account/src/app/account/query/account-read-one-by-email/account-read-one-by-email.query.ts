import { AccountFindOneByEmailDto } from '../../dto';

export class AccountReadOneByEmailQuery {
  constructor(public readonly dto: AccountFindOneByEmailDto) {}
}
