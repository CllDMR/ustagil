import { UserFindOneDto } from '../../dto/user-find-one.dto';

export class UserReadOneQuery {
  constructor(public readonly dto: UserFindOneDto) {}
}
