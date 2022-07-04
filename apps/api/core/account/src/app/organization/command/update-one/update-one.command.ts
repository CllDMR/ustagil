import { ICommand } from '@nestjs/cqrs';
import { OrganizationUpdateOneDto } from './update-one.dto';

export class OrganizationUpdateOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationUpdateOneDto) {}
}
