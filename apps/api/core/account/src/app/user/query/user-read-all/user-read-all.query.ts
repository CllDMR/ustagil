import { IQuery } from '@nestjs/cqrs';
import { UserFindAllDto } from '../../dto/user-find-all.dto';

export class UserReadAllQuery implements IQuery {
  constructor(public readonly dto: UserFindAllDto) {}
}
