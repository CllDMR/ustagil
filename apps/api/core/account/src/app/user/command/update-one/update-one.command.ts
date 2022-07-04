import { ICommand } from '@nestjs/cqrs';
import { UserUpdateOneDto } from './update-one.dto';

export class UserUpdateOneCommand implements ICommand {
  constructor(public readonly dto: UserUpdateOneDto) {}
}
