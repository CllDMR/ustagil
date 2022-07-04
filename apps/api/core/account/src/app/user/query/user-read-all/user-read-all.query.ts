import { IQuery } from '@nestjs/cqrs';
import { UserFindAllDto } from './user-find-all.dto';

export class UserReadAllQuery implements IQuery {
  constructor(public readonly dto: UserFindAllDto) {}
}
