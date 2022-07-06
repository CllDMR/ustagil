import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountSuperAdminDomain,
  IAccountSuperAdminGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationSuperAdminDomain } from '@ustagil/api/core/authentication/typing';
import {
  CustomRpcException,
  fromRpcToCustomRpcException,
} from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationSuperAdminValidatedEvent } from '../../event';
import { AuthenticationSuperAdminValidateQuery } from './validate.query';

@QueryHandler(AuthenticationSuperAdminValidateQuery)
export class AuthenticationSuperAdminValidateHandler
  implements IQueryHandler<AuthenticationSuperAdminValidateQuery>
{
  private readonly accountSuperAdminGrpcService: IAccountSuperAdminGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_SUPER_ADMIN_MS_GRPC)
    private readonly accountSuperAdminMSGrpcClient: ClientGrpc
  ) {
    this.accountSuperAdminGrpcService =
      this.accountSuperAdminMSGrpcClient.getService<IAccountSuperAdminGrpcService>(
        'AccountSuperAdminService'
      );
  }

  async execute({ dto }: AuthenticationSuperAdminValidateQuery) {
    const { email, password } = dto;

    const AuthenticationSuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationSuperAdminDomain);

    let accountSuperAdminDomain: AccountSuperAdminDomain;

    try {
      accountSuperAdminDomain = await firstValueFrom(
        (await this.accountSuperAdminGrpcService.GetAccountSuperAdminByEmail({
          email,
        })) as unknown as Observable<AccountSuperAdminDomain>
      );
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }

    const authenticationSuperAdminDomain =
      new AuthenticationSuperAdminMergedDomain(accountSuperAdminDomain);

    if (accountSuperAdminDomain.password !== password)
      throw new CustomRpcException({
        description: 'Could not find account.',
        errorCode: '',
        message: 'Could not find account.',
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    authenticationSuperAdminDomain.apply(
      new AuthenticationSuperAdminValidatedEvent(accountSuperAdminDomain.id)
    );

    authenticationSuperAdminDomain.commit();

    return authenticationSuperAdminDomain;
  }
}

// const account = await firstValueFrom(
//   this.accountMSClient
//     .send<AccountSuperAdminDomain, AccountFindOneByEmailMSMessage>(
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
