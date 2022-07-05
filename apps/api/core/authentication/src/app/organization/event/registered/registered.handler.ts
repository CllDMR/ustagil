import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationOrganizationRegisteredEvent } from './registered.event';

@EventsHandler(AuthenticationOrganizationRegisteredEvent)
export class AuthenticationOrganizationRegisteredHandler
  implements IEventHandler<AuthenticationOrganizationRegisteredEvent>
{
  async handle({
    accountId,
  }: AuthenticationOrganizationRegisteredEvent): Promise<void> {
    console.log('Registered account organization with id:', accountId);
  }
}
