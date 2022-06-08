import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { ACCOUNT_MS_GRPC } from '@ustagil/api/core/account/constant';
import {
  AccountDomain,
  IAccountGrpcController,
} from '@ustagil/api/core/account/typing';
import { AuthenticationDomain } from '@ustagil/api/core/authentication/typing';
import { CustomRpcException } from '@ustagil/api/core/common/typing';
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

    const Authentication =
      this.eventPublisher.mergeClassContext(AuthenticationDomain);

    let existingAccount;

    try {
      existingAccount = await firstValueFrom(
        (await this.accountGrpcService.GetAccountByEmail({
          email,
        })) as unknown as Observable<AccountDomain>
      );
    } catch (err) {
      void 0;
    }

    if (existingAccount)
      throw new CustomRpcException({
        description: 'Account already exist.',
        errorCode: '',
        message: 'Account already exist.',
        rpcErrorCode: Status.INTERNAL,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    const newAccount = await firstValueFrom(
      (await this.accountGrpcService.CreateAccount({
        displayName,
        email,
        organization,
        password,
      })) as unknown as Observable<AccountDomain>
    );

    const authentication = new Authentication({
      displayName: newAccount.displayName,
      email: newAccount.email,
      organization: newAccount.organization,
      password: newAccount.password,
    });

    authentication.apply(
      new AuthenticationRegisteredAccountEvent(newAccount.id)
    );
    authentication.commit();

    return authentication;
  }
}
