import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountSuperAdminDomain,
  IAccountSuperAdminGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationSuperAdminDomain } from '@ustagil/api/core/authentication/typing';
import { fromRpcToCustomRpcException } from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationSuperAdminRegisteredEvent } from '../../event';
import { AuthenticationSuperAdminRegisterCommand } from './register.command';

@CommandHandler(AuthenticationSuperAdminRegisterCommand)
export class AuthenticationSuperAdminRegisterHandler
  implements ICommandHandler<AuthenticationSuperAdminRegisterCommand>
{
  private readonly accountSuperAdminGrpcService: IAccountSuperAdminGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_SUPER_ADMIN_MS_GRPC)
    private accountSuperAdminMSGrpcClient: ClientGrpc
  ) {
    this.accountSuperAdminGrpcService =
      this.accountSuperAdminMSGrpcClient.getService<IAccountSuperAdminGrpcService>(
        'AccountSuperAdminService'
      );
  }

  async execute({
    dto,
  }: AuthenticationSuperAdminRegisterCommand): Promise<AuthenticationSuperAdminDomain> {
    const { displayName, email, password } = dto;

    const AuthenticationSuperAdminMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationSuperAdminDomain);

    try {
      const newAccountSuperAdmin = await firstValueFrom(
        (await this.accountSuperAdminGrpcService.CreateAccountSuperAdmin({
          displayName,
          email,
          password,
        })) as unknown as Observable<AccountSuperAdminDomain>
      );

      const authenticationSuperAdminDomain =
        new AuthenticationSuperAdminMergedDomain(newAccountSuperAdmin);

      authenticationSuperAdminDomain.apply(
        new AuthenticationSuperAdminRegisteredEvent(newAccountSuperAdmin.id)
      );
      authenticationSuperAdminDomain.commit();

      return authenticationSuperAdminDomain;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
