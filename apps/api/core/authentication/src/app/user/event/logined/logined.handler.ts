import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationUserLoginnedEvent } from './logined.event';

@EventsHandler(AuthenticationUserLoginnedEvent)
export class AuthenticationUserLoginnedHandler
  implements IEventHandler<AuthenticationUserLoginnedEvent>
{
  async handle({ id }: AuthenticationUserLoginnedEvent): Promise<void> {
    console.log('Loginned account user with id:', id);
  }
}
