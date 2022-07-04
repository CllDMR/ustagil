import { ICommand } from '@nestjs/cqrs';
import { OrganizationCreateOneCommandDto } from './create-one.dto';

export class OrganizationCreateOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationCreateOneCommandDto) {}
}
