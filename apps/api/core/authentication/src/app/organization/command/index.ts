import { AuthenticationOrganizationRegisterHandler } from './register/register.handler';

export const AuthenticationOrganizationCommandHandlers = [
  AuthenticationOrganizationRegisterHandler,
];

export { AuthenticationOrganizationRegisterCommand } from './register/register.command';
