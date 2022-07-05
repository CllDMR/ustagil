import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AuthenticationSuperAdminValidatedEvent } from './validated.event';

@EventsHandler(AuthenticationSuperAdminValidatedEvent)
export class AuthenticationSuperAdminValidatedHandler
  implements IEventHandler<AuthenticationSuperAdminValidatedEvent>
{
  async handle({
    accountId,
  }: AuthenticationSuperAdminValidatedEvent): Promise<void> {
    console.log('Validated account super_admin with id:', accountId);
  }
}
