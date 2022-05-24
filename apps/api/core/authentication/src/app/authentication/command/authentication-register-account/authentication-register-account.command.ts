import { AuthenticationRegisterAccountDto } from '../../dto/authentication-register-account';

export class AuthenticationRegisterAccountCommand {
  constructor(public readonly dto: AuthenticationRegisterAccountDto) {}
}
