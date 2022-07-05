import { AuthenticationUserRegisterHandler } from './register/register.handler';

export const AuthenticationUserCommandHandlers = [
  AuthenticationUserRegisterHandler,
];

export { AuthenticationUserRegisterCommand } from './register/register.command';
