import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationLoginnedAccountEvent } from './authentication-logined-account.event';

@EventsHandler(AuthenticationLoginnedAccountEvent)
export class AuthenticationLoginnedAccountHandler
  implements IEventHandler<AuthenticationLoginnedAccountEvent>
{
  async handle({
    displayName,
    email,
  }: AuthenticationLoginnedAccountEvent): Promise<void> {
    console.log('Loginned account with id:', displayName, email);
  }
}
