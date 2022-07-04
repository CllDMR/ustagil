import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindOneQueryDto } from './read-one.dto';

export class OrganizationReadOneQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindOneQueryDto) {}
}
