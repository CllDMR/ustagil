import { AuthenticationUserLoginnedHandler } from './logined/logined.handler';
import { AuthenticationUserRegisteredHandler } from './registered/registered.handler';
import { AuthenticationUserValidatedHandler } from './validated/validated.handler';

export const AuthenticationUserEventHandlers = [
  AuthenticationUserLoginnedHandler,
  AuthenticationUserRegisteredHandler,
  AuthenticationUserValidatedHandler,
];

export { AuthenticationUserLoginnedEvent } from './logined/logined.event';
export { AuthenticationUserRegisteredEvent } from './registered/registered.event';
export { AuthenticationUserValidatedEvent } from './validated/validated.event';
