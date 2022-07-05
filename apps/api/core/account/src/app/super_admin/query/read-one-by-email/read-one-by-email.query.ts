import { IQuery } from '@nestjs/cqrs';
import { AccountSuperAdminReadOneByEmailQueryDto } from './read-one-by-email.dto';

export class AccountSuperAdminReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: AccountSuperAdminReadOneByEmailQueryDto) {}
}
