import { IQuery } from '@nestjs/cqrs';
import { AccountOrganizationReadOneQueryDto } from './read-one.dto';

export class AccountOrganizationReadOneQuery implements IQuery {
  constructor(public readonly dto: AccountOrganizationReadOneQueryDto) {}
}
