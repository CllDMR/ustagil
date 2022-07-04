import { UserLoginnedHandler } from './logined/logined.handler';
import { UserRegisteredHandler } from './registered/registered.handler';
import { UserValidatedHandler } from './validated/validated.handler';

export const UserEventHandlers = [
  UserLoginnedHandler,
  UserRegisteredHandler,
  UserValidatedHandler,
];

export { UserLoginnedEvent } from './logined/logined.event';
export { UserRegisteredEvent } from './registered/registered.event';
export { UserValidatedEvent } from './validated/validated.event';
