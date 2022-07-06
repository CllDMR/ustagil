import { IQuery } from '@nestjs/cqrs';
import { AccountUserReadOneQueryDto } from './read-one.dto';

export class AccountUserReadOneQuery implements IQuery {
  constructor(public readonly dto: AccountUserReadOneQueryDto) {}
}
