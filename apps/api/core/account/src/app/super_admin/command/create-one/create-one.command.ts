import { ICommand } from '@nestjs/cqrs';
import { AccountSuperAdminCreateOneCommandDto } from './create-one.dto';

export class AccountSuperAdminCreateOneCommand implements ICommand {
  constructor(public readonly dto: AccountSuperAdminCreateOneCommandDto) {}
}
