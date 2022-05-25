import { UserFindAllDto } from '../../dto/user-find-all.dto';

export class UserReadAllQuery {
  constructor(public readonly dto: UserFindAllDto) {}
}
