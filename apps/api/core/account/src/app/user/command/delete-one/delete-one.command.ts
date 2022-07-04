import { ICommand } from '@nestjs/cqrs';
import { UserDeleteOneCommandDto } from './delete-one.dto';

export class UserDeleteOneCommand implements ICommand {
  constructor(public readonly dto: UserDeleteOneCommandDto) {}
}
