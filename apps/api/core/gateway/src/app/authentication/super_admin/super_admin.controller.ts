import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTHENTICATION_SUPER_ADMIN_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationSuperAdminRegisterRequestBodyDto,
  IAuthenticationSuperAdminGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationSuperAdminRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const account = req.user;
    return this.authenticationSuperAdminGrpcService.loginAccountSuperAdmin(
      account
    );
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
  getProfile(@Request() req) {
    return req.user;
  }
}
