import { ICommand } from '@nestjs/cqrs';
import { AccountUserDeleteOneCommandDto } from './delete-one.dto';

export class AccountUserDeleteOneCommand implements ICommand {
  constructor(public readonly dto: AccountUserDeleteOneCommandDto) {}
}
