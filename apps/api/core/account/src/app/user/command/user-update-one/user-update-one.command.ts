import { UserUpdateOneDto } from '../../dto/user-update-one.dto';

export class UserUpdateOneCommand {
  constructor(public readonly dto: UserUpdateOneDto) {}
}
