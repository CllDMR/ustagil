import { ICommand } from '@nestjs/cqrs';
import { UserUpdateOneCommandDto } from './update-one.dto';

export class UserUpdateOneCommand implements ICommand {
  constructor(public readonly dto: UserUpdateOneCommandDto) {}
}
