import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  BaseDomain,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import {
  CustomRpcException,
  fromRpcToCustomRpcException,
} from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseValidatedEvent } from '../../event';
import { BaseValidateQuery } from './validate.query';

@QueryHandler(BaseValidateQuery)
export class BaseValidateHandler implements IQueryHandler<BaseValidateQuery> {
  private readonly accountBaseGrpcService: IAccountBaseGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(BASE_MS_GRPC) private readonly accountBaseMSGrpcClient: ClientGrpc
  ) {
    this.accountBaseGrpcService =
      this.accountBaseMSGrpcClient.getService<IAccountBaseGrpcService>(
        'BaseService'
      );
  }

  async execute({ dto }: BaseValidateQuery) {
    const { email, password } = dto;

    const AuthenticationBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationBaseDomain);

    let accountBaseDomain: BaseDomain;

    try {
      accountBaseDomain = await firstValueFrom(
        (await this.accountBaseGrpcService.GetBaseByEmail({
          email,
        })) as unknown as Observable<BaseDomain>
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
      new BaseValidatedEvent(accountBaseDomain.id)
    );

    authenticationBaseMergedDomain.commit();

    return authenticationBaseMergedDomain;
  }
}

// const account = await firstValueFrom(
//   this.accountMSClient
//     .send<BaseDomain, AccountFindOneByEmailMSMessage>(
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
