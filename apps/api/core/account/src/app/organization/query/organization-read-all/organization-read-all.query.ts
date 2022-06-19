import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindAllDto } from '../../dto/organization-find-all.dto';

export class OrganizationReadAllQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindAllDto) {}
}
