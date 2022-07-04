import { ICommand } from '@nestjs/cqrs';
import { OrganizationDeleteOneDto } from './delete-one.dto';

export class OrganizationDeleteOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationDeleteOneDto) {}
}
