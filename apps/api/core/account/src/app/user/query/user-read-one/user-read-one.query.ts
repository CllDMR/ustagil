import { IQuery } from '@nestjs/cqrs';
import { UserFindOneDto } from '../../dto/user-find-one.dto';

export class UserReadOneQuery implements IQuery {
  constructor(public readonly dto: UserFindOneDto) {}
}
