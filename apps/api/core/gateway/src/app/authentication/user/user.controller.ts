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
import { AUTHENTICATION_USER_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationUserRegisterRequestBodyDto,
  IAuthenticationUserGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationUserRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';

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
  async login(@Request() req) {
    const account = req.user;
    return this.authenticationUserGrpcService.loginAccountUser(account);
  }

  @UseInterceptors(AuthenticationUserRegisterTransformInterceptor)
  @Post('register')
  registerAccount(@Body() dto: AuthenticationUserRegisterRequestBodyDto) {
    return this.authenticationUserGrpcService.registerAccountUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
