import { ICommand } from '@nestjs/cqrs';
import { AccountUpdateOneDto } from '../../dto/account-update-one.dto';

export class AccountUpdateOneCommand implements ICommand {
  constructor(public readonly dto: AccountUpdateOneDto) {}
}
