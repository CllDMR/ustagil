import { AuthenticationLoginnedAccountHandler } from './authentication-logined-account/authentication-logined-account.handler';
import { AuthenticationRegisteredAccountHandler } from './authentication-registered-account/authentication-registered-account.handler';
import { AuthenticationValidatedAccountHandler } from './authentication-validated-account/authentication-validated-account.handler';

export const AuthenticationEventHandlers = [
  AuthenticationLoginnedAccountHandler,
  AuthenticationRegisteredAccountHandler,
  AuthenticationValidatedAccountHandler,
];

export { AuthenticationLoginnedAccountEvent } from './authentication-logined-account/authentication-logined-account.event';
export { AuthenticationRegisteredAccountEvent } from './authentication-registered-account/authentication-registered-account.event';
export { AuthenticationValidatedAccountEvent } from './authentication-validated-account/authentication-validated-account.event';
