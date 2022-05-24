import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { AuthenticationRegisteredAccountEvent } from '../../event';
import { AuthenticationRegisterAccountCommand } from './authentication-register-account.command';

@CommandHandler(AuthenticationRegisterAccountCommand)
export class AuthenticationRegisterAccountHandler
  implements ICommandHandler<AuthenticationRegisterAccountCommand>
{
  constructor(private readonly eventPublisher: EventPublisher) {}

  async execute({
    dto,
  }: AuthenticationRegisterAccountCommand): Promise<AuthenticationDomain> {
    const { displayName, email, organization, password } = dto;
    const account = this.eventPublisher.mergeObjectContext(
      new AuthenticationDomain({ displayName, email, organization, password })
    );

    account.apply(new AuthenticationRegisteredAccountEvent(displayName));
    account.commit();

    return account;
  }
}
