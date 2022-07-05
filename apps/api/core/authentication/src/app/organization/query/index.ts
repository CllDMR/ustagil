import { AuthenticationOrganizationLoginHandler } from './login/login.handler';
import { AuthenticationOrganizationValidateHandler } from './validate/validate.handler';

export const AuthenticationOrganizationQueryHandlers = [
  AuthenticationOrganizationLoginHandler,
  AuthenticationOrganizationValidateHandler,
];

export { AuthenticationOrganizationLoginQuery } from './login/login.query';
export { AuthenticationOrganizationValidateQuery } from './validate/validate.query';
