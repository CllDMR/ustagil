import { ICommand } from '@nestjs/cqrs';
import { OrganizationDeleteOneCommandDto } from './delete-one.dto';

export class OrganizationDeleteOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationDeleteOneCommandDto) {}
}
