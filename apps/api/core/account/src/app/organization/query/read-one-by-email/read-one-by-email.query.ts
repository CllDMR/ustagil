import { IQuery } from '@nestjs/cqrs';
import { AccountOrganizationReadOneByEmailQueryDto } from './read-one-by-email.dto';

export class AccountOrganizationReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: AccountOrganizationReadOneByEmailQueryDto) {}
}
