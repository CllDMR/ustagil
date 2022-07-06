import { AuthenticationSuperAdminLoginHandler } from './login/login.handler';
import { AuthenticationSuperAdminValidateHandler } from './validate/validate.handler';

export const AuthenticationSuperAdminQueryHandlers = [
  AuthenticationSuperAdminLoginHandler,
  AuthenticationSuperAdminValidateHandler,
];

export { AuthenticationSuperAdminLoginQuery } from './login/login.query';
export { AuthenticationSuperAdminValidateQuery } from './validate/validate.query';
