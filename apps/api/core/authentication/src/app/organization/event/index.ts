import { OrganizationLoginnedHandler } from './logined/logined.handler';
import { OrganizationRegisteredHandler } from './registered/registered.handler';
import { OrganizationValidatedHandler } from './validated/validated.handler';

export const OrganizationEventHandlers = [
  OrganizationLoginnedHandler,
  OrganizationRegisteredHandler,
  OrganizationValidatedHandler,
];

export { OrganizationLoginnedEvent } from './logined/logined.event';
export { OrganizationRegisteredEvent } from './registered/registered.event';
export { OrganizationValidatedEvent } from './validated/validated.event';
