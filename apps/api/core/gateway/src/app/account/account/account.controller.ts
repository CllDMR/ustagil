import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { IAccountGrpcController } from '@ustagil/api/core/account/typing';
import {
  AllExceptionsFilter,
  TimeoutErrorExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  AccountCreateOneBodyDto,
  AccountFindAllQueryDto,
  AccountUpdateOneBodyDto,
} from './dtos';

@UseFilters(AllExceptionsFilter, TimeoutErrorExceptionsFilter)
@Controller()
export class AccountController implements OnModuleInit {
  private accountGrpcService: IAccountGrpcController;
  @Inject('ACCOUNT_GRPC_SERVICE') private accountMSGrpcClient: ClientGrpc;

  onModuleInit() {
    this.accountGrpcService =
      this.accountMSGrpcClient.getService<IAccountGrpcController>(
        'AccountService'
      );
  }

  @Post('accounts')
  postAccount(@Body() dto: AccountCreateOneBodyDto) {
    return this.accountGrpcService.CreateAccount({ account: dto });
  }

  @Get('accounts')
  getAccounts(@Query() dto: AccountFindAllQueryDto) {
    return this.accountGrpcService.ListAccounts({
      page_size: dto.page_size ?? 10,
    });
  }

  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.accountGrpcService.GetAccount({ id });
  }

  @Patch('accounts/:id')
  patchAccount(@Param('id') id: string, @Body() dto: AccountUpdateOneBodyDto) {
    return this.accountGrpcService.UpdateAccount({ id, account: dto });
  }

  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string) {
    return this.accountGrpcService.DeleteAccount({ id });
  }
}
