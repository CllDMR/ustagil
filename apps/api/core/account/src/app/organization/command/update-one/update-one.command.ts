import { ICommand } from '@nestjs/cqrs';
import { AccountOrganizationUpdateOneCommandDto } from './update-one.dto';

export class AccountOrganizationUpdateOneCommand implements ICommand {
  constructor(public readonly dto: AccountOrganizationUpdateOneCommandDto) {}
}
