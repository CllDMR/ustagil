import { ICommand } from '@nestjs/cqrs';
import { UserRegisterDto } from './register.dto';

export class UserRegisterCommand implements ICommand {
  constructor(public readonly dto: UserRegisterDto) {}
}
