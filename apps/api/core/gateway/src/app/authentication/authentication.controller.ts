import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AccountDomain } from '@ustagil/api/core/account/typing';
import {
  AUTHENTICATION_LOGIN_ACCOUNT_MSMESSAGE,
  AUTHENTICATION_MS,
  AUTHENTICATION_REGISTER_ACCOUNT_MSMESSAGE,
} from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationLoginAccountMSMessage,
  AuthenticationRegisterAccountMSMessage,
} from '@ustagil/api/core/authentication/typing';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';
import { AuthenticationRegisterAccountBodyDto } from './dtos';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class AuthenticationController {
  @Inject(AUTHENTICATION_MS) private authenticationMSClient: ClientKafka;

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const account: AccountDomain = req.user;

    return this.authenticationMSClient.send(
      AUTHENTICATION_LOGIN_ACCOUNT_MSMESSAGE,
      new AuthenticationLoginAccountMSMessage(
        account.id,
        account.email,
        account.displayName
      )
    );
  }

  @Post('register')
  registerAccount(@Body() dto: AuthenticationRegisterAccountBodyDto) {
    return this.authenticationMSClient.send(
      AUTHENTICATION_REGISTER_ACCOUNT_MSMESSAGE,
      new AuthenticationRegisterAccountMSMessage(
        dto.displayName,
        dto.email,
        dto.organization,
        dto.password
      )
    );
    // .pipe(timeout({ each: 15000 }));
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
