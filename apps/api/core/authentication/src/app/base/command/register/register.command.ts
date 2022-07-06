import { ICommand } from '@nestjs/cqrs';
import { AuthenticationBaseRegisterDto } from './register.dto';

export class AuthenticationBaseRegisterCommand implements ICommand {
  constructor(public readonly dto: AuthenticationBaseRegisterDto) {}
}
