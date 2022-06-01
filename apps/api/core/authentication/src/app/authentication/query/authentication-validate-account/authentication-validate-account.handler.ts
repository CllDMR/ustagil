import { Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import {
  ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
  ACCOUNT_MS_KAFKA,
} from '@ustagil/api/core/account/constant';
import {
  AccountDomain,
  AccountFindOneByEmailMSMessage,
} from '@ustagil/api/core/account/typing';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { CustomRpcException } from '@ustagil/api/core/common/typing';
import { catchError, firstValueFrom, timeout, TimeoutError } from 'rxjs';
import { AuthenticationValidatedAccountEvent } from '../../event';
import { AuthenticationValidateAccountQuery } from './authentication-validate-account.query';

@QueryHandler(AuthenticationValidateAccountQuery)
export class AuthenticationValidateAccountHandler
  implements IQueryHandler<AuthenticationValidateAccountQuery>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_MS_KAFKA) private accountMSClient: ClientKafka
  ) {}

  async execute({ dto }: AuthenticationValidateAccountQuery) {
    const { email, password } = dto;
    const authenticationDomain = new AuthenticationDomain({ email, password });

    authenticationDomain.email = email;
    authenticationDomain.password = password;

    const authentication =
      this.eventPublisher.mergeObjectContext(authenticationDomain);
    const account = await firstValueFrom(
      this.accountMSClient
        .send<AccountDomain, AccountFindOneByEmailMSMessage>(
          ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
          new AccountFindOneByEmailMSMessage(authentication.email)
        )
        .pipe(
          timeout({ each: 1500 }),
          catchError((err) => {
            if (err instanceof TimeoutError) {
              throw err;
            } else {
              throw new CustomRpcException(err.error);
            }
          })
        )
    );

    authentication.apply(new AuthenticationValidatedAccountEvent(account.id));

    authentication.commit();

    return account;
  }
}
