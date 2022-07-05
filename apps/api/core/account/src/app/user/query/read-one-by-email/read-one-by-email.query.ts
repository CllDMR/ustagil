import { IQuery } from '@nestjs/cqrs';
import { AccountUserReadOneByEmailQueryDto } from './read-one-by-email.dto';

export class AccountUserReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: AccountUserReadOneByEmailQueryDto) {}
}
