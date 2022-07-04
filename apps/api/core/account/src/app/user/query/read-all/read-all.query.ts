import { IQuery } from '@nestjs/cqrs';
import { UserFindAllQueryDto } from './read-all.dto';

export class UserReadAllQuery implements IQuery {
  constructor(public readonly dto: UserFindAllQueryDto) {}
}
