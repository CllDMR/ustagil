import { ICommand } from '@nestjs/cqrs';
import { UserCreateOneCommandDto } from './create-one.dto';

export class UserCreateOneCommand implements ICommand {
  constructor(public readonly dto: UserCreateOneCommandDto) {}
}
