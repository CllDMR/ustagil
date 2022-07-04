import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindAllDto } from './read-all.dto';

export class OrganizationReadAllQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindAllDto) {}
}
