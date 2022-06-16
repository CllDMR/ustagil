import { ICommand } from '@nestjs/cqrs';
import { AccountDeleteOneDto } from '../../dto/account-delete-one.dto';

export class AccountDeleteOneCommand implements ICommand {
  constructor(public readonly dto: AccountDeleteOneDto) {}
}
