import { OrganizationFindOneDto } from '../../dto/organization-find-one.dto';

export class OrganizationReadOneQuery {
  constructor(public readonly dto: OrganizationFindOneDto) {}
}
