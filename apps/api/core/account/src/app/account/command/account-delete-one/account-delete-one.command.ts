import { AccountDeleteOneDto } from '../../dto/account-delete-one.dto';

export class AccountDeleteOneCommand {
  constructor(public readonly dto: AccountDeleteOneDto) {}
}
