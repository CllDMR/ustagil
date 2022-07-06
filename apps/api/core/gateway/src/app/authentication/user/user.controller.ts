import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTHENTICATION_USER_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationUserLoginAccountResponse,
  AuthenticationUserRegisterRequestBodyDto,
  IAuthenticationUserGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationUserRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  MyRequest,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';
import { Response } from 'express';
import { firstValueFrom, Observable } from 'rxjs';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller('auth/user')
export class AuthenticationUserController {
  private authenticationUserGrpcService: IAuthenticationUserGrpcService;

  constructor(
    @Inject(AUTHENTICATION_USER_MS_GRPC)
    private readonly authenticationUserMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authenticationUserGrpcService =
      this.authenticationUserMSGrpcClient.getService<IAuthenticationUserGrpcService>(
        'AuthenticationUserService'
      );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: MyRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const account = req.user;
    const auth = await firstValueFrom(
      this.authenticationUserGrpcService.loginAccountUser(
        account
      ) as unknown as Observable<AuthenticationUserLoginAccountResponse>
    );
    res.cookie('access_token', auth.access_token, {
      httpOnly: true,
      secure: true,
    });
    return auth;
  }

  @UseInterceptors(AuthenticationUserRegisterTransformInterceptor)
  @Post('register')
  registerAccount(@Body() dto: AuthenticationUserRegisterRequestBodyDto) {
    return this.authenticationUserGrpcService.registerAccountUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
