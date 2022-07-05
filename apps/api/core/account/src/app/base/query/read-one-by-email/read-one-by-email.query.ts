import { IQuery } from '@nestjs/cqrs';
import { AccountBaseReadOneByEmailQueryDto } from './read-one-by-email.dto';

export class AccountBaseReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: AccountBaseReadOneByEmailQueryDto) {}
}
