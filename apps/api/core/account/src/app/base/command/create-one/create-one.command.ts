import { ICommand } from '@nestjs/cqrs';
import { AccountBaseCreateOneCommandDto } from './create-one.dto';

export class AccountBaseCreateOneCommand implements ICommand {
  constructor(public readonly dto: AccountBaseCreateOneCommandDto) {}
}
