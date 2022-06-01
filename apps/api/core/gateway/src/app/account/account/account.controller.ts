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
      { page_size: dto.page_size ?? 10 },
      new Metadata()
    );
  }

  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.accountGrpcService.getAccount({ id }, new Metadata());
  }

  @Patch('accounts/:id')
  patchAccount(@Param('id') id: string, @Body() dto: AccountUpdateOneBodyDto) {
    return this.accountGrpcService.updateAccount(
      { id, account: dto },
      new Metadata()
    );
  }

  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string) {
    return this.accountGrpcService.deleteAccount({ id }, new Metadata());
  }
}
