import { OrganizationFindAllDto } from '../../dto/organization-find-all.dto';

export class OrganizationReadAllQuery {
  constructor(public readonly dto: OrganizationFindAllDto) {}
}
