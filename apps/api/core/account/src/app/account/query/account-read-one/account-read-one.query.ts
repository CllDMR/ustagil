import { AccountFindOneDto } from '../../dto/account-find-one.dto';

export class AccountReadOneQuery {
  constructor(public readonly dto: AccountFindOneDto) {}
}
