import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountDomain,
  IAccountGrpcController,
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
  private readonly accountGrpcService: IAccountGrpcController;

  constructor(
    private readonly eventPublisher: EventPublisher,
    @Inject(ACCOUNT_MS_GRPC) private accountMSGrpcClient: ClientGrpc
  ) {
    this.accountGrpcService =
      this.accountMSGrpcClient.getService<IAccountGrpcController>(
        'AccountService'
      );
  }

  async execute({
    dto,
  }: AuthenticationRegisterAccountCommand): Promise<AuthenticationDomain> {
    const { displayName, email, organization, password } = dto;

    const AuthenticationMergedDomain =
      this.eventPublisher.mergeClassContext(AuthenticationDomain);

    try {
      const newAccount = await firstValueFrom(
        (await this.accountGrpcService.CreateAccount({
          displayName,
          email,
          organization,
          password,
        })) as unknown as Observable<AccountDomain>
      );

      const authentication = new AuthenticationMergedDomain(newAccount);

      authentication.apply(
        new AuthenticationRegisteredAccountEvent(newAccount.id)
      );
      authentication.commit();

      return authentication;
    } catch (error) {
      throw fromRpcToCustomRpcException(error);
    }
  }
}
