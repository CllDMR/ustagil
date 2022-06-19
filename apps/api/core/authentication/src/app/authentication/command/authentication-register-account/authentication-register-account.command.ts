import { ICommand } from '@nestjs/cqrs';
import { AuthenticationRegisterAccountDto } from '../../dto/authentication-register-account';

export class AuthenticationRegisterAccountCommand implements ICommand {
  constructor(public readonly dto: AuthenticationRegisterAccountDto) {}
}
