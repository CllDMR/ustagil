import { ICommand } from '@nestjs/cqrs';
import { AccountSuperAdminDeleteOneCommandDto } from './delete-one.dto';

export class AccountSuperAdminDeleteOneCommand implements ICommand {
  constructor(public readonly dto: AccountSuperAdminDeleteOneCommandDto) {}
}
