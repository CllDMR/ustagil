import { IQuery } from '@nestjs/cqrs';
import { AccountBaseReadOneQueryDto } from './read-one.dto';

export class AccountBaseReadOneQuery implements IQuery {
  constructor(public readonly dto: AccountBaseReadOneQueryDto) {}
}
