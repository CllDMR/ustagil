import { IQuery } from '@nestjs/cqrs';
import { AccountOrganizationReadAllQueryDto } from './read-all.dto';

export class AccountOrganizationReadAllQuery implements IQuery {
  constructor(public readonly dto: AccountOrganizationReadAllQueryDto) {}
}
