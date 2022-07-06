import { ICommand } from '@nestjs/cqrs';
import { AccountBaseUpdateOneCommandDto } from './update-one.dto';

export class AccountBaseUpdateOneCommand implements ICommand {
  constructor(public readonly dto: AccountBaseUpdateOneCommandDto) {}
}
