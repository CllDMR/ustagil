import { AuthenticationLoginAccountHandler } from './authentication-login-account/authentication-login-account.handler';
import { AuthenticationValidateAccountHandler } from './authentication-validate-account/authentication-validate-account.handler';

export const AuthenticationQueryHandlers = [
  AuthenticationLoginAccountHandler,
  AuthenticationValidateAccountHandler,
];

export { AuthenticationLoginAccountQuery } from './authentication-login-account/authentication-login-account.query';
export { AuthenticationValidateAccountQuery } from './authentication-validate-account/authentication-validate-account.query';
