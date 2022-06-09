import { OrganizationCreateOneDto } from '../../dto/organization-create-one.dto';

export class OrganizationCreateOneCommand {
  constructor(public readonly dto: OrganizationCreateOneDto) {}
}
