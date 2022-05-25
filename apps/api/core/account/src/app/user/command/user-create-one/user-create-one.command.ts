import { UserCreateOneDto } from '../../dto/user-create-one.dto';

export class UserCreateOneCommand {
  constructor(public readonly dto: UserCreateOneDto) {}
}
