import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_ORGANIZATION_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountOrganizationDomain,
  IAccountOrganizationGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationOrganizationDomain } from '@ustagil/api/core/authentication/typing';
import { fromRpcToCustomRpcException } from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationOrganizationRegisteredEvent } from '../../event';
import { AuthenticationOrganizationRegisterCommand } from './register.command';

@CommandHandler(AuthenticationOrganizationRegisterCommand)
export class AuthenticationOrganizationRegisterHandler
  implements ICommandHandler<AuthenticationOrganizationRegisterCommand>
{
  private readonly accountOrganizationGrpcService: IAccountOrganizationGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_ORGANIZATION_MS_GRPC)
    private accountOrganizationMSGrpcClient: ClientGrpc
  ) {
    this.accountOrganizationGrpcService =
      this.accountOrganizationMSGrpcClient.getService<IAccountOrganizationGrpcService>(
        'AccountOrganizationService'
      );
  }

  async execute({
    dto,
  }: AuthenticationOrganizationRegisterCommand): Promise<AuthenticationOrganizationDomain> {
    const { displayName, email, password, organization } = dto;

    const AuthenticationOrganizationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationOrganizationDomain);

    try {
      const newAccountOrganizationDomain = await firstValueFrom(
        (await this.accountOrganizationGrpcService.CreateAccountOrganization({
          displayName,
          email,
          password,
          organization,
        })) as unknown as Observable<AccountOrganizationDomain>
      );

      const authenticationOrganizationDomain =
        new AuthenticationOrganizationMergedDomain(
          newAccountOrganizationDomain
        );

      authenticationOrganizationDomain.apply(
        new AuthenticationOrganizationRegisteredEvent(
          newAccountOrganizationDomain.id
        )
      );
      authenticationOrganizationDomain.commit();

      return authenticationOrganizationDomain;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
