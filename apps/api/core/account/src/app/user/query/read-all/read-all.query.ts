import { IQuery } from '@nestjs/cqrs';
import { UserFindAllDto } from './read-all.dto';

export class UserReadAllQuery implements IQuery {
  constructor(public readonly dto: UserFindAllDto) {}
}
