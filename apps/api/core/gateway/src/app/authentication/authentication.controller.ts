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
import { ClientGrpc } from '@nestjs/microservices';
import { AUTHENTICATION_MS_GRPC } from '@ustagil/api/core/authentication/constant';
import { IAuthenticationGrpcController } from '@ustagil/api/core/authentication/typing';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import { JwtAuthGuard, LocalAuthGuard } from '@ustagil/api/core/common/util';
import { AuthenticationRegisterAccountBodyDto } from './dtos';

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

  @Post('register')
  registerAccount(@Body() dto: AuthenticationRegisterAccountBodyDto) {
    return this.authenticationGrpcService.registerAccount(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
