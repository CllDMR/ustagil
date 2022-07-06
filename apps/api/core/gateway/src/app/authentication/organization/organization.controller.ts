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
import { AUTHENTICATION_ORGANIZATION_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationOrganizationLoginAccountResponse,
  AuthenticationOrganizationRegisterRequestBodyDto,
  IAuthenticationOrganizationGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationOrganizationRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  MyRequest,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';
import { Response } from 'express';
import { firstValueFrom, Observable } from 'rxjs';

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
  async login(
    @Req() req: MyRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    const account = req.user;
    const auth = await firstValueFrom(
      this.authenticationOrganizationGrpcService.loginAccountOrganization(
        account
      ) as unknown as Observable<AuthenticationOrganizationLoginAccountResponse>
    );
    res.cookie('access_token', auth.access_token, {
      httpOnly: true,
      secure: true,
    });
    return auth;
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
  getProfile(@Req() req) {
    return req.user;
  }
}
