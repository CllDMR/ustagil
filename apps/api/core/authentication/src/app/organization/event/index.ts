import { AuthenticationOrganizationLoginnedHandler } from './logined/logined.handler';
import { AuthenticationOrganizationRegisteredHandler } from './registered/registered.handler';
import { AuthenticationOrganizationValidatedHandler } from './validated/validated.handler';

export const AuthenticationOrganizationEventHandlers = [
  AuthenticationOrganizationLoginnedHandler,
  AuthenticationOrganizationRegisteredHandler,
  AuthenticationOrganizationValidatedHandler,
];

export { AuthenticationOrganizationLoginnedEvent } from './logined/logined.event';
export { AuthenticationOrganizationRegisteredEvent } from './registered/registered.event';
export { AuthenticationOrganizationValidatedEvent } from './validated/validated.event';
