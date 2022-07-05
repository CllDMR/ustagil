import { AuthenticationBaseLoginnedHandler } from './logined/logined.handler';
import { AuthenticationBaseRegisteredHandler } from './registered/registered.handler';
import { AuthenticationBaseValidatedHandler } from './validated/validated.handler';

export const AuthenticationBaseEventHandlers = [
  AuthenticationBaseLoginnedHandler,
  AuthenticationBaseRegisteredHandler,
  AuthenticationBaseValidatedHandler,
];

export { AuthenticationBaseLoginnedEvent } from './logined/logined.event';
export { AuthenticationBaseRegisteredEvent } from './registered/registered.event';
export { AuthenticationBaseValidatedEvent } from './validated/validated.event';
