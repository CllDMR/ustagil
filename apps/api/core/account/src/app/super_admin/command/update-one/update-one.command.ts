import { ICommand } from '@nestjs/cqrs';
import { AccountSuperAdminUpdateOneCommandDto } from './update-one.dto';

export class AccountSuperAdminUpdateOneCommand implements ICommand {
  constructor(public readonly dto: AccountSuperAdminUpdateOneCommandDto) {}
}
