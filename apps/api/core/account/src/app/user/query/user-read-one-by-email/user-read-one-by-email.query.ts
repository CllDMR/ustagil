import { IQuery } from '@nestjs/cqrs';
import { UserFindOneByEmailDto } from '../../dto';

export class UserReadOneByEmailQuery implements IQuery {
  constructor(public readonly dto: UserFindOneByEmailDto) {}
}
