import { AccountFindAllDto } from '../../dto/account-find-all.dto';

export class AccountReadAllQuery {
  constructor(public readonly dto: AccountFindAllDto) {}
}
