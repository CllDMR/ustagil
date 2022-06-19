import { IQuery } from '@nestjs/cqrs';
import { OrganizationFindOneDto } from '../../dto/organization-find-one.dto';

export class OrganizationReadOneQuery implements IQuery {
  constructor(public readonly dto: OrganizationFindOneDto) {}
}
