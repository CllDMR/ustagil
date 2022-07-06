import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationUserRegisteredEvent } from './registered.event';

@EventsHandler(AuthenticationUserRegisteredEvent)
export class AuthenticationUserRegisteredHandler
  implements IEventHandler<AuthenticationUserRegisteredEvent>
{
  async handle({
    accountId,
  }: AuthenticationUserRegisteredEvent): Promise<void> {
    console.log('Registered account user with id:', accountId);
  }
}
