import { IQuery } from '@nestjs/cqrs';
import { UserFindOneDto } from './read-one.dto';

export class UserReadOneQuery implements IQuery {
  constructor(public readonly dto: UserFindOneDto) {}
}
