import { ICommand } from '@nestjs/cqrs';
import { UserCreateOneDto } from './user-create-one.dto';

export class UserCreateOneCommand implements ICommand {
  constructor(public readonly dto: UserCreateOneDto) {}
}
