import { ICommand } from '@nestjs/cqrs';
import { UserDeleteOneDto } from './delete-one.dto';

export class UserDeleteOneCommand implements ICommand {
  constructor(public readonly dto: UserDeleteOneDto) {}
}
