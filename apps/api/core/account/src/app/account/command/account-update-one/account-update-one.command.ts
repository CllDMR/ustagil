import { AccountUpdateOneDto } from '../../dto/account-update-one.dto';

export class AccountUpdateOneCommand {
  constructor(public readonly dto: AccountUpdateOneDto) {}
}
