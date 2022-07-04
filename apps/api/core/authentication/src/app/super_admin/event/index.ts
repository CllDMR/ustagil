import { SuperAdminLoginnedHandler } from './logined/logined.handler';
import { SuperAdminRegisteredHandler } from './registered/registered.handler';
import { SuperAdminValidatedHandler } from './validated/validated.handler';

export const SuperAdminEventHandlers = [
  SuperAdminLoginnedHandler,
  SuperAdminRegisteredHandler,
  SuperAdminValidatedHandler,
];

export { SuperAdminLoginnedEvent } from './logined/logined.event';
export { SuperAdminRegisteredEvent } from './registered/registered.event';
export { SuperAdminValidatedEvent } from './validated/validated.event';
