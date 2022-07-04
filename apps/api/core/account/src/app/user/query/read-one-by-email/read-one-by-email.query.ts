import { IQuery } from '@nestjs/cqrs';
import { UserFindOneByEmailQueryDto } from './read-one-by-email.dto';

export class UserReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: UserFindOneByEmailQueryDto) {}
}
