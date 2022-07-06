import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_USER_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountUserDomain,
  IAccountUserGrpcService,
} from '@ustagil/api/core/account/typing';
import { AuthenticationUserDomain } from '@ustagil/api/core/authentication/typing';
import { fromRpcToCustomRpcException } from '@ustagil/api/core/common/typing';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthenticationUserRegisteredEvent } from '../../event';
import { AuthenticationUserRegisterCommand } from './register.command';

@CommandHandler(AuthenticationUserRegisterCommand)
export class AuthenticationUserRegisterHandler
  implements ICommandHandler<AuthenticationUserRegisterCommand>
{
  private readonly accountUserGrpcService: IAccountUserGrpcService;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_USER_MS_GRPC) private accountUserMSGrpcClient: ClientGrpc
  ) {
    this.accountUserGrpcService =
      this.accountUserMSGrpcClient.getService<IAccountUserGrpcService>(
        'AccountUserService'
      );
  }

  async execute({
    dto,
  }: AuthenticationUserRegisterCommand): Promise<AuthenticationUserDomain> {
    const { displayName, email, password } = dto;

    const AuthenticationUserMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationUserDomain);

    try {
      const newAccountUser = await firstValueFrom(
        (await this.accountUserGrpcService.CreateAccountUser({
          displayName,
          email,
          password,
        })) as unknown as Observable<AccountUserDomain>
      );

      const authenticationUserDomain = new AuthenticationUserMergedDomain(
        newAccountUser
      );

      authenticationUserDomain.apply(
        new AuthenticationUserRegisteredEvent(newAccountUser.id)
      );
      authenticationUserDomain.commit();

      return authenticationUserDomain;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
