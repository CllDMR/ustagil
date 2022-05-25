import { OrganizationUpdateOneDto } from '../../dto/organization-update-one.dto';

export class OrganizationUpdateOneCommand {
  constructor(public readonly dto: OrganizationUpdateOneDto) {}
}
