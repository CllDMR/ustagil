import { ICommand } from '@nestjs/cqrs';
import { AccountOrganizationDeleteOneCommandDto } from './delete-one.dto';

export class AccountOrganizationDeleteOneCommand implements ICommand {
  constructor(public readonly dto: AccountOrganizationDeleteOneCommandDto) {}
}
