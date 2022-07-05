import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_ORGANIZATION_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountOrganizationDomain,
  IAccountOrganizationGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationOrganizationDomain } from '@ustagil/api/core/authentication/typing';
import {
  CustomRpcException,
  fromRpcToCustomRpcException,
} from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationOrganizationValidatedEvent } from '../../event';
import { AuthenticationOrganizationValidateQuery } from './validate.query';

@QueryHandler(AuthenticationOrganizationValidateQuery)
export class AuthenticationOrganizationValidateHandler
  implements IQueryHandler<AuthenticationOrganizationValidateQuery>
{
  private readonly accountOrganizationGrpcService: IAccountOrganizationGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_ORGANIZATION_MS_GRPC)
    private readonly accountOrganizationMSGrpcClient: ClientGrpc
  ) {
    this.accountOrganizationGrpcService =
      this.accountOrganizationMSGrpcClient.getService<IAccountOrganizationGrpcService>(
        'AccountOrganizationService'
      );
  }

  async execute({ dto }: AuthenticationOrganizationValidateQuery) {
    const { email, password } = dto;

    const AuthenticationOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationOrganizationDomain);

    let accountOrganizationDomain: AccountOrganizationDomain;

    try {
      accountOrganizationDomain = await firstValueFrom(
        (await this.accountOrganizationGrpcService.GetAccountOrganizationByEmail(
          {
            email,
          }
        )) as unknown as Observable<AccountOrganizationDomain>
      );
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }

    const authenticationOrganizationDomain =
      new AuthenticationOrganizationMergedDomain(accountOrganizationDomain);

    if (accountOrganizationDomain.password !== password)
      throw new CustomRpcException({
        description: 'Could not find account.',
        errorCode: '',
        message: 'Could not find account.',
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    authenticationOrganizationDomain.apply(
      new AuthenticationOrganizationValidatedEvent(accountOrganizationDomain.id)
    );

    authenticationOrganizationDomain.commit();

    return authenticationOrganizationDomain;
  }
}

// const account = await firstValueFrom(
//   this.accountMSClient
//     .send<AccountOrganizationDomain, AccountFindOneByEmailMSMessage>(
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
