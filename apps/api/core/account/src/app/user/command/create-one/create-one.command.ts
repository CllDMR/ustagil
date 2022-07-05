import { ICommand } from '@nestjs/cqrs';
import { AccountUserCreateOneCommandDto } from './create-one.dto';

export class AccountUserCreateOneCommand implements ICommand {
  constructor(public readonly dto: AccountUserCreateOneCommandDto) {}
}
