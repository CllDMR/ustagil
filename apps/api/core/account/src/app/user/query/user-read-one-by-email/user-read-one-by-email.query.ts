import { UserFindOneByEmailDto } from '../../dto';

export class UserReadOneByEmailQuery {
  constructor(public readonly dto: UserFindOneByEmailDto) {}
}
