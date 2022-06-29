import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  BaseDomain,
  IBaseGrpcController,
} from '@ustagil/api/core/account/typing';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { fromRpcToCustomRpcException } from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationRegisteredAccountEvent } from '../../event';
import { AuthenticationRegisterAccountCommand } from './authentication-register-account.command';

@CommandHandler(AuthenticationRegisterAccountCommand)
export class AuthenticationRegisterAccountHandler
  implements ICommandHandler<AuthenticationRegisterAccountCommand>
{
  private readonly baseGrpcService: IBaseGrpcController;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(BASE_MS_GRPC) private baseMSGrpcClient: ClientGrpc
  ) {
    this.baseGrpcService =
      this.baseMSGrpcClient.getService<IBaseGrpcController>('BaseService');
  }

  async execute({
    dto,
  }: AuthenticationRegisterAccountCommand): Promise<AuthenticationDomain> {
    const { displayName, email, organization, password } = dto;

    const AuthenticationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationDomain);

    try {
      const newBase = await firstValueFrom(
        (await this.baseGrpcService.CreateBase({
          displayName,
          email,
          organization,
          password,
        })) as unknown as Observable<BaseDomain>
      );

      const authentication = new AuthenticationMergedDomain(newBase);

      authentication.apply(
        new AuthenticationRegisteredAccountEvent(newBase.id)
      );
      authentication.commit();

      return authentication;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
