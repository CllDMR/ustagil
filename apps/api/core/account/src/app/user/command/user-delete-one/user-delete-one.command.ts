import { UserDeleteOneDto } from '../../dto/user-delete-one.dto';

export class UserDeleteOneCommand {
  constructor(public readonly dto: UserDeleteOneDto) {}
}
