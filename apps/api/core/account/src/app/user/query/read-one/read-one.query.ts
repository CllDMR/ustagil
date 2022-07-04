import { IQuery } from '@nestjs/cqrs';
import { UserFindOneQueryDto } from './read-one.dto';

export class UserReadOneQuery implements IQuery {
  constructor(public readonly dto: UserFindOneQueryDto) {}
}
