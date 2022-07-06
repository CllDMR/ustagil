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
import { AUTHENTICATION_BASE_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationBaseLoginAccountResponse,
  AuthenticationBaseRegisterRequestBodyDto,
  IAuthenticationBaseGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationBaseRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  MyRequest,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  BaseLocalAuthGuard,
  JwtAuthGuard,
} from '@ustagil/api/core/common/util';
import { Response } from 'express';
import { firstValueFrom, Observable } from 'rxjs';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller('auth/base')
export class AuthenticationBaseController {
  private authenticationBaseGrpcService: IAuthenticationBaseGrpcService;

  constructor(
    @Inject(AUTHENTICATION_BASE_MS_GRPC)
    private readonly authenticationBaseMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authenticationBaseGrpcService =
      this.authenticationBaseMSGrpcClient.getService<IAuthenticationBaseGrpcService>(
        'AuthenticationBaseService'
      );
  }

  @UseGuards(BaseLocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: MyRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const account = req.user;
    const auth = await firstValueFrom(
      this.authenticationBaseGrpcService.loginAccountBase(
        account
      ) as unknown as Observable<AuthenticationBaseLoginAccountResponse>
    );
    res.cookie('access_token', auth.access_token, {
      httpOnly: true,
      secure: true,
    });
    return auth;
  }

  @UseInterceptors(AuthenticationBaseRegisterTransformInterceptor)
  @Post('register')
  registerAccount(@Body() dto: AuthenticationBaseRegisterRequestBodyDto) {
    return this.authenticationBaseGrpcService.registerAccountBase(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
