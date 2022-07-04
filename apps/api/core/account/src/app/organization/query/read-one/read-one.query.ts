import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindOneDto } from './read-one.dto';

export class OrganizationReadOneQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindOneDto) {}
}
