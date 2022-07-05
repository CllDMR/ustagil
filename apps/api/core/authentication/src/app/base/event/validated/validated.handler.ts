import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationBaseValidatedEvent } from './validated.event';

@EventsHandler(AuthenticationBaseValidatedEvent)
export class AuthenticationBaseValidatedHandler
  implements IEventHandler<AuthenticationBaseValidatedEvent>
{
  async handle({ accountId }: AuthenticationBaseValidatedEvent): Promise<void> {
    console.log('Validated account base with id:', accountId);
  }
}
