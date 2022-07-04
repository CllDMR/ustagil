import { ICommand } from '@nestjs/cqrs';
import { OrganizationCreateOneDto } from './organization-create-one.dto';

export class OrganizationCreateOneCommand implements ICommand {
  constructor(public readonly dto: OrganizationCreateOneDto) {}
}
