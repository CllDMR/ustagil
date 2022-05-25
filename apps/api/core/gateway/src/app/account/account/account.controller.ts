import { Metadata } from '@grpc/grpc-js';
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
    return this.accountGrpcService.createAccount(
      { account: dto },
      new Metadata()
    );
  }

  @Get('accounts')
  getAccounts(@Query() dto: AccountFindAllQueryDto) {
    return this.accountGrpcService.listAccounts(
      { page_size: dto.page_size ?? 10, page_token: dto.page_token ?? '' },
      new Metadata()
    );
  }

  @Get('accounts/:account_id')
  getAccount(@Param('account_id') account_id: string) {
    return this.accountGrpcService.getAccount(
      { id: account_id },
      new Metadata()
    );
  }

  @Patch('accounts/:account_id')
  patchAccount(
    @Param('account_id') account_id: string,
    @Body() dto: AccountUpdateOneBodyDto
  ) {
    return this.accountGrpcService.updateAccount(
      { id: account_id, account: dto },
      new Metadata()
    );
  }

  @Delete('accounts/:account_id')
  deleteAccount(@Param('account_id') account_id: string) {
    return this.accountGrpcService.deleteAccount(
      { id: account_id },
      new Metadata()
    );
  }
}
