import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountDomain,
  IAccountGrpcController,
} from '@ustagil/api/core/account/typing';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import {
  CustomRpcException,
  fromRpcToCustomRpcException,
} from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationValidatedAccountEvent } from '../../event';
import { AuthenticationValidateAccountQuery } from './authentication-validate-account.query';

@QueryHandler(AuthenticationValidateAccountQuery)
export class AuthenticationValidateAccountHandler
  implements IQueryHandler<AuthenticationValidateAccountQuery>
{
  private readonly accountGrpcService: IAccountGrpcController;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_MS_GRPC) private readonly accountMSGrpcClient: ClientGrpc
  ) {
    this.accountGrpcService =
      this.accountMSGrpcClient.getService<IAccountGrpcController>(
        'AccountService'
      );
  }

  async execute({ dto }: AuthenticationValidateAccountQuery) {
    const { email, password } = dto;

    const AuthenticationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationDomain);

    let accountDomain: AccountDomain;

    try {
      accountDomain = await firstValueFrom(
        (await this.accountGrpcService.GetAccountByEmail({
          email,
        })) as unknown as Observable<AccountDomain>
      );
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }

    const authenticationMergedDomain = new AuthenticationMergedDomain(
      accountDomain
    );

    if (accountDomain.password !== password)
      throw new CustomRpcException({
        description: 'Could not find account.',
        errorCode: '',
        message: 'Could not find account.',
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    authenticationMergedDomain.apply(
      new AuthenticationValidatedAccountEvent(accountDomain.id)
    );

    authenticationMergedDomain.commit();

    return authenticationMergedDomain;
  }
}

// const account = await firstValueFrom(
//   this.accountMSClient
//     .send<AccountDomain, AccountFindOneByEmailMSMessage>(
//       ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
//       new AccountFindOneByEmailMSMessage(authentication.email)
//     )
//     .pipe(
//       timeout({ each: 1500 }),
//       catchError((err) => {
//         if (err instanceof TimeoutError) {
//           throw err;
//         } else {
//           throw new CustomRpcException(err.error);
//         }
//       })
//     )
// );
