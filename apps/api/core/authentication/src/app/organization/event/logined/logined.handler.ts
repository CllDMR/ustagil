import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationOrganizationLoginnedEvent } from './logined.event';

@EventsHandler(AuthenticationOrganizationLoginnedEvent)
export class AuthenticationOrganizationLoginnedHandler
  implements IEventHandler<AuthenticationOrganizationLoginnedEvent>
{
  async handle({
    displayName,
    email,
  }: AuthenticationOrganizationLoginnedEvent): Promise<void> {
    console.log('Loginned account organization with id:', displayName, email);
  }
}
