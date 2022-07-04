import { ICommand } from '@nestjs/cqrs';
import { OrganizationUpdateOneCommandDto } from './update-one.dto';

export class OrganizationUpdateOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationUpdateOneCommandDto) {}
}
