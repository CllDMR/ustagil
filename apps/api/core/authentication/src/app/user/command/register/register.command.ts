import { ICommand } from '@nestjs/cqrs';
import { AuthenticationUserRegisterDto } from './register.dto';

export class AuthenticationUserRegisterCommand implements ICommand {
  constructor(public readonly dto: AuthenticationUserRegisterDto) {}
}
