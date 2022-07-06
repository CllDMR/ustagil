import { ICommand } from '@nestjs/cqrs';
import { AccountOrganizationCreateOneCommandDto } from './create-one.dto';

export class AccountOrganizationCreateOneCommand implements ICommand {
  constructor(public readonly dto: AccountOrganizationCreateOneCommandDto) {}
}
