import { AuthenticationBaseRegisterHandler } from './register/register.handler';

export const AuthenticationBaseCommandHandlers = [
  AuthenticationBaseRegisterHandler,
];

export { AuthenticationBaseRegisterCommand } from './register/register.command';
