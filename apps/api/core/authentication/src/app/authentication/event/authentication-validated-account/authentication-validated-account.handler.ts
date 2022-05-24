import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationValidatedAccountEvent } from './authentication-validated-account.event';

@EventsHandler(AuthenticationValidatedAccountEvent)
export class AuthenticationValidatedAccountHandler
  implements IEventHandler<AuthenticationValidatedAccountEvent>
{
  async handle({
    accountId,
  }: AuthenticationValidatedAccountEvent): Promise<void> {
    console.log('Validated account with id:', accountId);
  }
}
