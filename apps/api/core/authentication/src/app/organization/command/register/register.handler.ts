import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { BASE_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  BaseDomain,
  IAccountBaseGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationBaseDomain } from '@ustagil/api/core/authentication/typing';
import { fromRpcToCustomRpcException } from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { OrganizationRegisteredEvent } from '../../event';
import { OrganizationRegisterCommand } from './register.command';

@CommandHandler(OrganizationRegisterCommand)
export class OrganizationRegisterHandler
  implements ICommandHandler<OrganizationRegisterCommand>
{
  private readonly accountBaseGrpcService: IAccountBaseGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(BASE_MS_GRPC) private accountBaseMSGrpcClient: ClientGrpc
  ) {
    this.accountBaseGrpcService =
      this.accountBaseMSGrpcClient.getService<IAccountBaseGrpcService>(
        'BaseService'
      );
  }

  async execute({
    dto,
  }: OrganizationRegisterCommand): Promise<AuthenticationBaseDomain> {
    const { displayName, email, password } = dto;

    const AuthenticationBaseMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationBaseDomain);

    try {
      const newAccountBaseDomain = await firstValueFrom(
        (await this.accountBaseGrpcService.CreateBase({
          displayName,
          email,
          password,
        })) as unknown as Observable<BaseDomain>
      );

      const authenticationBaseDomain = new AuthenticationBaseMergedDomain(
        newAccountBaseDomain
      );

      authenticationBaseDomain.apply(
        new OrganizationRegisteredEvent(newAccountBaseDomain.id)
      );
      authenticationBaseDomain.commit();

      return authenticationBaseDomain;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
