import { AuthenticationUserLoginHandler } from './login/login.handler';
import { AuthenticationUserValidateHandler } from './validate/validate.handler';

export const AuthenticationUserQueryHandlers = [
  AuthenticationUserLoginHandler,
  AuthenticationUserValidateHandler,
];

export { AuthenticationUserLoginQuery } from './login/login.query';
export { AuthenticationUserValidateQuery } from './validate/validate.query';
