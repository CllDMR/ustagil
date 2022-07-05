import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationOrganizationValidatedEvent } from './validated.event';

@EventsHandler(AuthenticationOrganizationValidatedEvent)
export class AuthenticationOrganizationValidatedHandler
  implements IEventHandler<AuthenticationOrganizationValidatedEvent>
{
  async handle({
    accountId,
  }: AuthenticationOrganizationValidatedEvent): Promise<void> {
    console.log('Validated account organization with id:', accountId);
  }
}
