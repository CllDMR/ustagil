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
import { AUTHENTICATION_SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationSuperAdminLoginAccountResponse,
  AuthenticationSuperAdminRegisterRequestBodyDto,
  IAuthenticationSuperAdminGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationSuperAdminRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  MyRequest,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  JwtAuthGuard,
  SuperAdminLocalAuthGuard,
} from '@ustagil/api/core/common/util';
import { Response } from 'express';
import { firstValueFrom, Observable } from 'rxjs';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller('auth/super_admin')
export class AuthenticationSuperAdminController {
  private authenticationSuperAdminGrpcService: IAuthenticationSuperAdminGrpcService;

  constructor(
    @Inject(AUTHENTICATION_SUPER_ADMIN_MS_GRPC)
    private readonly authenticationSuperAdminMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authenticationSuperAdminGrpcService =
      this.authenticationSuperAdminMSGrpcClient.getService<IAuthenticationSuperAdminGrpcService>(
        'AuthenticationSuperAdminService'
      );
  }

  @UseGuards(SuperAdminLocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: MyRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const account = req.user;
    const auth = await firstValueFrom(
      this.authenticationSuperAdminGrpcService.loginAccountSuperAdmin(
        account
      ) as unknown as Observable<AuthenticationSuperAdminLoginAccountResponse>
    );
    res.cookie('access_token', auth.access_token, {
      httpOnly: true,
      secure: true,
    });
    return auth;
  }

  @UseInterceptors(AuthenticationSuperAdminRegisterTransformInterceptor)
  @Post('register')
  registerAccount(@Body() dto: AuthenticationSuperAdminRegisterRequestBodyDto) {
    return this.authenticationSuperAdminGrpcService.registerAccountSuperAdmin(
      dto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
