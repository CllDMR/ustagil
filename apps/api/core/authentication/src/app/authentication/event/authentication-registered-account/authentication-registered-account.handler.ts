import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationRegisteredAccountEvent } from './authentication-registered-account.event';

@EventsHandler(AuthenticationRegisteredAccountEvent)
export class AuthenticationRegisteredAccountHandler
  implements IEventHandler<AuthenticationRegisteredAccountEvent>
{
  async handle({
    accountId,
  }: AuthenticationRegisteredAccountEvent): Promise<void> {
    console.log('Registered account with id:', accountId);
  }
}
