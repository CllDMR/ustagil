import { AuthenticationSuperAdminRegisterHandler } from './register/register.handler';

export const AuthenticationSuperAdminCommandHandlers = [
  AuthenticationSuperAdminRegisterHandler,
];

export { AuthenticationSuperAdminRegisterCommand } from './register/register.command';
