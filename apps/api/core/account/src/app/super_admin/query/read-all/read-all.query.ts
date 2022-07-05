import { IQuery } from '@nestjs/cqrs';
import { AccountSuperAdminReadAllQueryDto } from './read-all.dto';

export class AccountSuperAdminReadAllQuery implements IQuery {
  constructor(public readonly dto: AccountSuperAdminReadAllQueryDto) {}
}
