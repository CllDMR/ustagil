import { BaseLoginnedHandler } from './logined/logined.handler';
import { BaseRegisteredHandler } from './registered/registered.handler';
import { BaseValidatedHandler } from './validated/validated.handler';

export const BaseEventHandlers = [
  BaseLoginnedHandler,
  BaseRegisteredHandler,
  BaseValidatedHandler,
];

export { BaseLoginnedEvent } from './logined/logined.event';
export { BaseRegisteredEvent } from './registered/registered.event';
export { BaseValidatedEvent } from './validated/validated.event';
