import { IQuery } from '@nestjs/cqrs';
import { UserFindOneByEmailDto } from './read-one-by-email.dto';

export class UserReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: UserFindOneByEmailDto) {}
}
