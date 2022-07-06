import { AuthenticationBaseLoginHandler } from './login/login.handler';
import { BaseValidateHandler } from './validate/validate.handler';

export const AuthenticationBaseQueryHandlers = [
  AuthenticationBaseLoginHandler,
  BaseValidateHandler,
];

export { AuthenticationBaseLoginQuery } from './login/login.query';
export { AuthenticationBaseValidateQuery } from './validate/validate.query';
