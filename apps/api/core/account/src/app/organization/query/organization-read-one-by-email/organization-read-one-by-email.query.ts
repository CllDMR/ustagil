import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindOneByEmailDto } from '../../dto';

export class OrganizationReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindOneByEmailDto) {}
}
