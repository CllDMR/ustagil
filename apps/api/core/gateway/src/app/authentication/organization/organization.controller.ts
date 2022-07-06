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
import { AUTHENTICATION_ORGANIZATION_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationOrganizationRegisterRequestBodyDto,
  IAuthenticationOrganizationGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationOrganizationRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller('auth/organization')
export class AuthenticationOrganizationController {
  private authenticationOrganizationGrpcService: IAuthenticationOrganizationGrpcService;

  constructor(
    @Inject(AUTHENTICATION_ORGANIZATION_MS_GRPC)
    private readonly authenticationOrganizationMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authenticationOrganizationGrpcService =
      this.authenticationOrganizationMSGrpcClient.getService<IAuthenticationOrganizationGrpcService>(
        'AuthenticationOrganizationService'
      );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const account = req.user;
    return this.authenticationOrganizationGrpcService.loginAccountOrganization(
      account
    );
  }

  @UseInterceptors(AuthenticationOrganizationRegisterTransformInterceptor)
  @Post('register')
  registerAccount(
    @Body() dto: AuthenticationOrganizationRegisterRequestBodyDto
  ) {
    return this.authenticationOrganizationGrpcService.registerAccountOrganization(
      dto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
