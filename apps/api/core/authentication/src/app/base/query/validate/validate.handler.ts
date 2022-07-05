import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountBaseDomain,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import {
  CustomRpcException,
  fromRpcToCustomRpcException,
} from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationBaseValidatedEvent } from '../../event';
import { AuthenticationBaseValidateQuery } from './validate.query';

@QueryHandler(AuthenticationBaseValidateQuery)
export class BaseValidateHandler
  implements IQueryHandler<AuthenticationBaseValidateQuery>
{
  private readonly accountBaseGrpcService: IAccountBaseGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_BASE_MS_GRPC)
    private readonly accountBaseMSGrpcClient: ClientGrpc
  ) {
    this.accountBaseGrpcService =
      this.accountBaseMSGrpcClient.getService<IAccountBaseGrpcService>(
        'AccountBaseService'
      );
  }

  async execute({ dto }: AuthenticationBaseValidateQuery) {
    const { email, password } = dto;

    const AuthenticationBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationBaseDomain);

    let accountBaseDomain: AccountBaseDomain;

    try {
      accountBaseDomain = await firstValueFrom(
        (await this.accountBaseGrpcService.GetAccountBaseByEmail({
          email,
        })) as unknown as Observable<AccountBaseDomain>
      );
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }

    const authenticationBaseMergedDomain = new AuthenticationBaseMergedDomain(
      accountBaseDomain
    );

    if (accountBaseDomain.password !== password)
      throw new CustomRpcException({
        description: 'Could not find account.',
        errorCode: '',
        message: 'Could not find account.',
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    authenticationBaseMergedDomain.apply(
      new AuthenticationBaseValidatedEvent(accountBaseDomain.id)
    );

    authenticationBaseMergedDomain.commit();

    return authenticationBaseMergedDomain;
  }
}

// const account = await firstValueFrom(
//   this.accountMSClient
//     .send<AccountBaseDomain, AccountFindOneByEmailMSMessage>(
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
