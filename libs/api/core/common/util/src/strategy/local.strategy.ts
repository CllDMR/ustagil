import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import {
  AUTHENTICATION_MS,
  AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE,
} from '@ustagil/api/core/authentication/constant';
import { AuthenticationValidateAccountMSMessage } from '@ustagil/api/core/authentication/typing';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTHENTICATION_MS) private authenticationMSClient: ClientKafka
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const authentication = await firstValueFrom(
      this.authenticationMSClient.send(
        AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE,
        new AuthenticationValidateAccountMSMessage(email, password)
      )
      // .pipe(timeout({ each: 15000 }))
    );

    if (!authentication) {
      throw new UnauthorizedException();
    }
    return authentication;
  }
}
