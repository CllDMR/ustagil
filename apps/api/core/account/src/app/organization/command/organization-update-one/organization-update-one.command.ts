import { ICommand } from '@nestjs/cqrs';
import { OrganizationUpdateOneDto } from '../../dto/organization-update-one.dto';

export class OrganizationUpdateOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationUpdateOneDto) {}
}
