import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_USER_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountUserDomain,
  IAccountUserGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationUserDomain } from '@ustagil/api/core/authentication/typing';
import {
  CustomRpcException,
  fromRpcToCustomRpcException,
} from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationUserValidatedEvent } from '../../event';
import { AuthenticationUserValidateQuery } from './validate.query';

@QueryHandler(AuthenticationUserValidateQuery)
export class AuthenticationUserValidateHandler
  implements IQueryHandler<AuthenticationUserValidateQuery>
{
  private readonly accountUserGrpcService: IAccountUserGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_USER_MS_GRPC)
    private readonly accountUserMSGrpcClient: ClientGrpc
  ) {
    this.accountUserGrpcService =
      this.accountUserMSGrpcClient.getService<IAccountUserGrpcService>(
        'AccountUserService'
      );
  }

  async execute({ dto }: AuthenticationUserValidateQuery) {
    const { email, password } = dto;

    const AuthenticationUserMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationUserDomain);

    let accountUserDomain: AccountUserDomain;

    try {
      accountUserDomain = await firstValueFrom(
        (await this.accountUserGrpcService.GetAccountUserByEmail({
          email,
        })) as unknown as Observable<AccountUserDomain>
      );
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }

    const authenticationUserDomain = new AuthenticationUserMergedDomain(
      accountUserDomain
    );

    if (accountUserDomain.password !== password)
      throw new CustomRpcException({
        description: 'Could not find account.',
        errorCode: '',
        message: 'Could not find account.',
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    authenticationUserDomain.apply(
      new AuthenticationUserValidatedEvent(accountUserDomain.id)
    );

    authenticationUserDomain.commit();

    return authenticationUserDomain;
  }
}

// const account = await firstValueFrom(
//   this.accountMSClient
//     .send<AccountUserDomain, AccountFindOneByEmailMSMessage>(
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
