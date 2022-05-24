import { AccountCreateOneDto } from '../../dto/account-create-one.dto';

export class AccountCreateOneCommand {
  constructor(public readonly dto: AccountCreateOneDto) {}
}
