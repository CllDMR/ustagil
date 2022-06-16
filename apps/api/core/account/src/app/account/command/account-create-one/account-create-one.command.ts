import { ICommand } from '@nestjs/cqrs';
import { AccountCreateOneDto } from '../../dto/account-create-one.dto';

export class AccountCreateOneCommand implements ICommand {
  constructor(public readonly dto: AccountCreateOneDto) {}
}
