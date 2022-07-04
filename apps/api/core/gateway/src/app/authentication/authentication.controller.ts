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
import { AUTHENTICATION_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import {
  IAuthenticationGrpcController,
  RegisterRequestBodyDto,
} from '@ustagil/api/core/authentication/typing';
import { RegisterTransformInterceptor } from '@ustagil/api/core/authentication/util';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class AuthenticationController {
  private authenticationGrpcService: IAuthenticationGrpcController;

  constructor(
    @Inject(AUTHENTICATION_MS_GRPC)
    private readonly authenticationMSGrpcClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.authenticationGrpcService =
      this.authenticationMSGrpcClient.getService<IAuthenticationGrpcController>(
        'AuthenticationService'
      );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const account = req.user;
    return this.authenticationGrpcService.loginAccount(account);
  }

  @UseInterceptors(RegisterTransformInterceptor)
  @Post('register')
  registerAccount(@Body() dto: RegisterRequestBodyDto) {
    return this.authenticationGrpcService.registerAccount(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
