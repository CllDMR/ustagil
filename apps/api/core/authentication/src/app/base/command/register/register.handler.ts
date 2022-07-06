import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountBaseDomain,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import { fromRpcToCustomRpcException } from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationBaseRegisteredEvent } from '../../event';
import { AuthenticationBaseRegisterCommand } from './register.command';

@CommandHandler(AuthenticationBaseRegisterCommand)
export class AuthenticationBaseRegisterHandler
  implements ICommandHandler<AuthenticationBaseRegisterCommand>
{
  private readonly accountBaseGrpcService: IAccountBaseGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_BASE_MS_GRPC) private accountBaseMSGrpcClient: ClientGrpc
  ) {
    this.accountBaseGrpcService =
      this.accountBaseMSGrpcClient.getService<IAccountBaseGrpcService>(
        'AccountBaseService'
      );
  }

  async execute({
    dto,
  }: AuthenticationBaseRegisterCommand): Promise<AuthenticationBaseDomain> {
    const { displayName, email, password } = dto;

    const AuthenticationBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationBaseDomain);

    try {
      const newAccountBaseDomain = await firstValueFrom(
        (await this.accountBaseGrpcService.CreateAccountBase({
          displayName,
          email,
          password,
        })) as unknown as Observable<AccountBaseDomain>
      );

      const authenticationBaseDomain = new AuthenticationBaseMergedDomain(
        newAccountBaseDomain
      );

      authenticationBaseDomain.apply(
        new AuthenticationBaseRegisteredEvent(newAccountBaseDomain.id)
      );
      authenticationBaseDomain.commit();

      return authenticationBaseDomain;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
