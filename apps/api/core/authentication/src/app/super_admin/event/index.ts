import { AuthenticationSuperAdminLoginnedHandler } from './logined/logined.handler';
import { AuthenticationSuperAdminRegisteredHandler } from './registered/registered.handler';
import { AuthenticationSuperAdminValidatedHandler } from './validated/validated.handler';

export const AuthenticationSuperAdminEventHandlers = [
  AuthenticationSuperAdminLoginnedHandler,
  AuthenticationSuperAdminRegisteredHandler,
  AuthenticationSuperAdminValidatedHandler,
];

export { AuthenticationSuperAdminLoginnedEvent } from './logined/logined.event';
export { AuthenticationSuperAdminRegisteredEvent } from './registered/registered.event';
export { AuthenticationSuperAdminValidatedEvent } from './validated/validated.event';
