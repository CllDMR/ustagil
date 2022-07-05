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
import { AUTHENTICATION_BASE_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  AuthenticationBaseRegisterRequestBodyDto,
  IAuthenticationBaseGrpcService,
} from '@ustagil/api/core/authentication/typing';
import { AuthenticationBaseRegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const account = req.user;
    return this.authenticationBaseGrpcService.loginAccountBase(account);
  }

  @UseInterceptors(AuthenticationBaseRegisterTransformInterceptor)
  @Post('register')
  registerAccount(@Body() dto: AuthenticationBaseRegisterRequestBodyDto) {
    return this.authenticationBaseGrpcService.registerAccountBase(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
