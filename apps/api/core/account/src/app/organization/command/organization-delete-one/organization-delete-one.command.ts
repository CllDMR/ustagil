import { ICommand } from '@nestjs/cqrs';
import { OrganizationDeleteOneDto } from './organization-delete-one.dto';

export class OrganizationDeleteOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationDeleteOneDto) {}
}
