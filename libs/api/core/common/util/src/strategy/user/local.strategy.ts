import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ACCOUNT_USER_MS_GRPC } from '@ustagil/api/core/account/constant';
import { IAccountUserGrpcService } from '@ustagil/api/core/account/typing';
import { AUTHENTICATION_USER_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationUserDomain,
  IAuthenticationUserGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { Strategy } from 'passport-local';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'UserLocalStrategy'
) {
  private readonly authenticationUserGrpcService: IAuthenticationUserGrpcService;
  private readonly accountUserGrpcService: IAccountUserGrpcService;

  constructor(
    @Inject(AUTHENTICATION_USER_MS_GRPC)
    private readonly authenticationUserClientGrpc: ClientGrpc,
    @Inject(ACCOUNT_USER_MS_GRPC)
    private readonly accountUserClientGrpc: ClientGrpc
  ) {
    super({ usernameField: 'email' });

    this.authenticationUserGrpcService =
      this.authenticationUserClientGrpc.getService<IAuthenticationUserGrpcService>(
        'AuthenticationUserService'
      );
    this.accountUserGrpcService =
      this.accountUserClientGrpc.getService<IAccountUserGrpcService>(
        'AccountUserService'
      );
  }

  async validate(
    email: string,
    password: string
  ): Promise<AuthenticationUserDomain> {
    const authenticationUserDomain = await firstValueFrom(
      (await this.authenticationUserGrpcService.validateAccountUser({
        email,
        password,
      })) as unknown as Observable<AuthenticationUserDomain>
    );

    return authenticationUserDomain;
  }
}
// console.log(
//   '🚀 ~ file: local.strategy.ts ~ line 19 ~ LocalStrategy ~ classLocalStrategyextendsPassportStrategy ~ this.clientGrpc',
//   this.clientGrpc
// );
// console.log(
//   (this.clientGrpc as any).grpcClients[0].AuthenticationService.service
//     .ValidateAccount
// );

///

// console.log(
//   '🚀 ~ file: local.strategy.ts ~ line 24 ~ LocalStrategy ~ validate ~ password',
//   password
// );
// console.log(
//   '🚀 ~ file: local.strategy.ts ~ line 24 ~ LocalStrategy ~ validate ~ email',
//   email
// );
// const authentication = await firstValueFrom(
//   this.authenticationMSClient.send(
//     AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE,
//     new AuthenticationValidateAccountMSMessage(email, password)
//   )
//   // .pipe(timeout({ each: 15000 }))
// );
// console.log(
//   '🚀 ~ file: local.strategy.ts ~ line 40 ~ LocalStrategy ~ validate ~ this.authenticationGrpcService',
//   this.authenticationGrpcService
// );

// try {
//   const accounts = await this.accountGrpcService.ListAccounts({});
//   console.log(
//     '🚀 ~ file: local.strategy.ts ~ line 60 ~ LocalStrategy ~ validate ~ accounts',
//     accounts
//   );

//   (accounts as any).subscribe((val) => console.log('val accounts:', val));
// } catch (error) {
//   console.error('error 1:', error);
// }

///

// try {
//   // console.log(
//   //   '🚀 ~ file: local.strategy.ts ~ line 79 ~ LocalStrategy ~ validate ~ password',
//   //   password
//   // );
//   // console.log(
//   //   '🚀 ~ file: local.strategy.ts ~ line 79 ~ LocalStrategy ~ validate ~ password',
//   //   typeof password
//   // );
//   // console.log(
//   //   '🚀 ~ file: local.strategy.ts ~ line 79 ~ LocalStrategy ~ validate ~ email',
//   //   email
//   // );
//   console.log(
//     '🚀 ~ file: local.strategy.ts ~ line 54 ~ LocalStrategy ~ validate ~ account',
//     account
//   );

//   (account as any).subscribe((val) => console.log('val account:', val));
// } catch (error) {
//   console.log('EEEEERRRRROOORRRR');

//   console.error('error 2:', error);
// }

// if (!account) {
//   throw new UnauthorizedException();
// }
// console.log(
//   '🚀 ~ file: local.strategy.ts ~ line 114 ~ LocalStrategy ~ validate ~ account',
//   authentication
// );

///

// return new AccountDomain({
//   id: 'id',
//   displayName: 'displayName',
//   email: 'email',
//   password: 'password',
// });
