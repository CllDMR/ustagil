import { AuthenticationRegisterAccountHandler } from './authentication-register-account/authentication-register-account.handler';

export const AuthenticationCommandHandlers = [
  AuthenticationRegisterAccountHandler,
];

export { AuthenticationRegisterAccountCommand } from './authentication-register-account/authentication-register-account.command';
