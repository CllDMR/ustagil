import { OrganizationDeleteOneDto } from '../../dto/organization-delete-one.dto';

export class OrganizationDeleteOneCommand {
  constructor(public readonly dto: OrganizationDeleteOneDto) {}
}
