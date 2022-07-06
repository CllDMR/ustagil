import { ICommand } from '@nestjs/cqrs';
import { AccountUserUpdateOneCommandDto } from './update-one.dto';

export class AccountUserUpdateOneCommand implements ICommand {
  constructor(public readonly dto: AccountUserUpdateOneCommandDto) {}
}
