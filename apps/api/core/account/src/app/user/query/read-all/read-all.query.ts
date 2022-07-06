import { IQuery } from '@nestjs/cqrs';
import { AccountUserReadAllQueryDto } from './read-all.dto';

export class AccountUserReadAllQuery implements IQuery {
  constructor(public readonly dto: AccountUserReadAllQueryDto) {}
}
