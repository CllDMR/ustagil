import { IQuery } from '@nestjs/cqrs';
import { AccountSuperAdminReadOneQueryDto } from './read-one.dto';

export class AccountSuperAdminReadOneQuery implements IQuery {
  constructor(public readonly dto: AccountSuperAdminReadOneQueryDto) {}
}
