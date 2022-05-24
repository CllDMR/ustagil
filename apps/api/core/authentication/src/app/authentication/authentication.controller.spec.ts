import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { AllRpcExceptionsFilter } from '@ustagil/api/core/common/typing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationCommandHandlers } from './command';
import { AuthenticationEventHandlers } from './event';
import { AuthenticationQueryHandlers } from './query';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [AuthenticationController],
      providers: [
        {
          provide: APP_FILTER,
          useClass: AllRpcExceptionsFilter,
        },
        ...AuthenticationCommandHandlers,
        ...AuthenticationEventHandlers,
        ...AuthenticationQueryHandlers,
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
