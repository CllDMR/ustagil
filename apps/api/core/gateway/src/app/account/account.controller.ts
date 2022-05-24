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
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import {
  ACCOUNT_CREATE_ONE_MSEVENT,
  ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
  ACCOUNT_FIND_ONE_MSMESSAGE,
  ACCOUNT_MS_KAFKA,
  ACCOUNT_REMOVE_ONE_MSEVENT,
  ACCOUNT_UPDATE_ONE_MSEVENT,
} from '@ustagil/api/core/account/constant';
import {
  AccountCreateOneMSEvent,
  AccountDeleteOneMSEvent,
  AccountFindOneByEmailMSMessage,
  AccountFindOneMSMessage,
  AccountUpdateOneMSEvent,
  IAccountGrpcController,
} from '@ustagil/api/core/account/typing';
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
  @Inject(ACCOUNT_MS_KAFKA) private accountMSKafkaClient: ClientKafka;

  onModuleInit() {
    this.accountGrpcService =
      this.accountMSGrpcClient.getService<IAccountGrpcController>(
        'AccountService'
      );
  }

  @Post('accounts')
  postAccount(@Body() dto: AccountCreateOneBodyDto): void {
    this.accountMSKafkaClient.emit(
      ACCOUNT_CREATE_ONE_MSEVENT,
      new AccountCreateOneMSEvent(
        dto.displayName,
        dto.email,
        dto.organization,
        dto.password
      )
    );
    return;
  }

  @Get('accounts')
  getAccounts(@Query() dto: AccountFindAllQueryDto) {
    return this.accountGrpcService.listAccounts(
      { page_size: dto.page_size ?? 10, page_token: dto.page_token ?? '' },
      new Metadata()
    );

    // return this.accountMSKafkaClient.send(
    //   ACCOUNT_FIND_ALL_MSMESSAGE,
    //   new AccountFindAllMSMessage(dto.page_size, dto.page_token)
    // );

    // .pipe(timeout({ each: 15000 }));
  }

  @Get('accounts/:id')
  getAccount(@Param('id') id: string) {
    return this.accountMSKafkaClient.send(
      ACCOUNT_FIND_ONE_MSMESSAGE,
      new AccountFindOneMSMessage(id)
    );
    // .pipe(timeout({ each: 15000 }));
  }

  @Post('acc')
  getAccountByEmail(@Body('email') email: string) {
    return this.accountMSKafkaClient.send(
      ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
      new AccountFindOneByEmailMSMessage(email)
    );
    // .pipe(timeout({ each: 15000 }));
  }

  @Patch('accounts/:id')
  patchAccount(
    @Param('id') id: string,
    @Body() dto: AccountUpdateOneBodyDto
  ): void {
    this.accountMSKafkaClient.emit(
      ACCOUNT_UPDATE_ONE_MSEVENT,
      new AccountUpdateOneMSEvent(
        id,
        dto.displayName,
        dto.email,
        dto.organization
      )
    );
    return;
  }

  @Delete('accounts/:id')
  deleteAccount(@Param('id') id: string): void {
    this.accountMSKafkaClient.emit(
      ACCOUNT_REMOVE_ONE_MSEVENT,
      new AccountDeleteOneMSEvent(id)
    );
    return;
  }
}
