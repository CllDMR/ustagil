import { ICommand } from '@nestjs/cqrs';
import { AccountBaseDeleteOneCommandDto } from './delete-one.dto';

export class AccountBaseDeleteOneCommand implements ICommand {
  constructor(public readonly dto: AccountBaseDeleteOneCommandDto) {}
}
