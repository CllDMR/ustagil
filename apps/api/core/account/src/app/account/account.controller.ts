import { Controller, UseFilters } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  ACCOUNT_CREATE_ONE_MSEVENT,
  ACCOUNT_FIND_ALL_MSMESSAGE,
  ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
  ACCOUNT_FIND_ONE_MSMESSAGE,
  ACCOUNT_REMOVE_ONE_MSEVENT,
  ACCOUNT_UPDATE_ONE_MSEVENT,
} from '@ustagil/api/core/account/constant';
import {
  AccountCreateOneMSEvent,
  AccountDeleteOneMSEvent,
  AccountFindAllMSMessage,
  AccountFindOneByEmailMSMessage,
  AccountFindOneMSMessage,
  AccountUpdateOneMSEvent,
} from '@ustagil/api/core/account/typing';
import {
  AllCustomRpcExceptionsFilter,
  TimeoutErrorRpcExceptionsFilter,
} from '@ustagil/api/core/common/typing';
import {
  AccountCreateOneCommand,
  AccountDeleteOneCommand,
  AccountUpdateOneCommand,
} from './command';
import {
  AccountReadAllQuery,
  AccountReadOneByEmailQuery,
  AccountReadOneQuery,
} from './query';

@UseFilters(AllCustomRpcExceptionsFilter, TimeoutErrorRpcExceptionsFilter)
@Controller()
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @EventPattern(ACCOUNT_CREATE_ONE_MSEVENT)
  async createOne(
    @Payload('value') dto: AccountCreateOneMSEvent
  ): Promise<void> {
    await this.commandBus.execute(new AccountCreateOneCommand(dto));
  }

  @MessagePattern(ACCOUNT_FIND_ALL_MSMESSAGE)
  async findAll(@Payload('value') dto: AccountFindAllMSMessage) {
    return await this.queryBus.execute(new AccountReadAllQuery(dto));
  }

  @MessagePattern(ACCOUNT_FIND_ONE_MSMESSAGE)
  async findOne(@Payload('value') dto: AccountFindOneMSMessage) {
    return await this.queryBus.execute(new AccountReadOneQuery(dto));
  }

  @MessagePattern(ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE)
  async findOneByEmail(@Payload('value') dto: AccountFindOneByEmailMSMessage) {
    return await this.queryBus.execute(new AccountReadOneByEmailQuery(dto));
  }

  @EventPattern(ACCOUNT_UPDATE_ONE_MSEVENT)
  async updateOne(@Payload('value') dto: AccountUpdateOneMSEvent) {
    await this.commandBus.execute(new AccountUpdateOneCommand(dto));
  }

  @EventPattern(ACCOUNT_REMOVE_ONE_MSEVENT)
  async removeOne(@Payload('value') dto: AccountDeleteOneMSEvent) {
    await this.commandBus.execute(new AccountDeleteOneCommand(dto));
  }
}
