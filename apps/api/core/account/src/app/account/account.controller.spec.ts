import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  Account,
  AccountEntityDomainFactory,
  AccountMongooseRepository,
  AccountSchema,
} from '@ustagil/api/core/account/data-access';
import { AllRpcExceptionsFilter } from '@ustagil/api/core/common/typing';
import { AccountController } from './account.controller';
import { AccountCommandHandlers } from './command';
import { AccountEventHandlers } from './event';
import { AccountQueryHandlers } from './query';

describe('AccountController', () => {
  let controller: AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          {
            name: Account.name,
            schema: AccountSchema,
          },
        ]),
        CqrsModule,
      ],
      controllers: [AccountController],
      providers: [
        {
          provide: APP_FILTER,
          useClass: AllRpcExceptionsFilter,
        },
        AccountMongooseRepository,
        AccountEntityDomainFactory,
        ...AccountCommandHandlers,
        ...AccountEventHandlers,
        ...AccountQueryHandlers,
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
