import { ICommand } from '@nestjs/cqrs';
import { OrganizationUpdateOneDto } from './organization-update-one.dto';

export class OrganizationUpdateOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationUpdateOneDto) {}
}
