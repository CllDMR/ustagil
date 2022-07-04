import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindOneByEmailQueryDto } from './read-one-by-email.dto';

export class OrganizationReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindOneByEmailQueryDto) {}
}
