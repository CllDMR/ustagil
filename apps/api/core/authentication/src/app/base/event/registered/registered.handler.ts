import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationBaseRegisteredEvent } from './registered.event';

@EventsHandler(AuthenticationBaseRegisteredEvent)
export class AuthenticationBaseRegisteredHandler
  implements IEventHandler<AuthenticationBaseRegisteredEvent>
{
  async handle({
    accountId,
  }: AuthenticationBaseRegisteredEvent): Promise<void> {
    console.log('Registered account base with id:', accountId);
  }
}
