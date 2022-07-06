import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationUserValidatedEvent } from './validated.event';

@EventsHandler(AuthenticationUserValidatedEvent)
export class AuthenticationUserValidatedHandler
  implements IEventHandler<AuthenticationUserValidatedEvent>
{
  async handle({ accountId }: AuthenticationUserValidatedEvent): Promise<void> {
    console.log('Validated account user with id:', accountId);
  }
}
