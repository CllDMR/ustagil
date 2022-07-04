import { ICommand } from '@nestjs/cqrs';
import { UserDeleteOneDto } from './user-delete-one.dto';

export class UserDeleteOneCommand implements ICommand {
  constructor(public readonly dto: UserDeleteOneDto) {}
}
