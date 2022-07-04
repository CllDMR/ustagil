import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindAllQueryDto } from './read-all.dto';

export class OrganizationReadAllQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindAllQueryDto) {}
}
