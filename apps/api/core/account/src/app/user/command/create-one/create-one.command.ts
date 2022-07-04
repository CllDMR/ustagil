import { ICommand } from '@nestjs/cqrs';
import { UserCreateOneDto } from './create-one.dto';

export class UserCreateOneCommand implements ICommand {
  constructor(public readonly dto: UserCreateOneDto) {}
}
