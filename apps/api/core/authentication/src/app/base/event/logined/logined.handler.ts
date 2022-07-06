import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationBaseLoginnedEvent } from './logined.event';

@EventsHandler(AuthenticationBaseLoginnedEvent)
export class AuthenticationBaseLoginnedHandler
  implements IEventHandler<AuthenticationBaseLoginnedEvent>
{
  async handle({ id }: AuthenticationBaseLoginnedEvent): Promise<void> {
    console.log('Loginned account base with id:', id);
  }
}
