import { IQuery } from '@nestjs/cqrs';
import { AccountBaseReadAllQueryDto } from './read-all.dto';

export class AccountBaseReadAllQuery implements IQuery {
  constructor(public readonly dto: AccountBaseReadAllQueryDto) {}
}
