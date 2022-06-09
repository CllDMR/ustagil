import { OrganizationFindOneByEmailDto } from '../../dto';

export class OrganizationReadOneByEmailQuery {
  constructor(public readonly dto: OrganizationFindOneByEmailDto) {}
}
