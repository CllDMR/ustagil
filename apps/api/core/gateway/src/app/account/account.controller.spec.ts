import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ACCOUNT_MS_KAFKA,
  ACCOUNT_MS_KAFKA_CLIENT_ID,
  ACCOUNT_MS_KAFKA_CONSUMER_GROUP_ID,
} from '@ustagil/api/core/account/constant';
import { AccountController } from './account.controller';

describe('AccountController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AccountController],
      imports: [
        ClientsModule.register([
          {
            name: ACCOUNT_MS_KAFKA,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: ACCOUNT_MS_KAFKA_CLIENT_ID,
                brokers: ['localhost:9092'],
              },
              consumer: {
                groupId: ACCOUNT_MS_KAFKA_CONSUMER_GROUP_ID,
              },
            },
          },
        ]),
      ],
    }).compile();
  });

  describe('getAccounts', () => {
    it('should return list of Account', () => {
      const appController = app.get<AccountController>(AccountController);
      expect(
        appController.getAccounts({ page_size: 10, page_token: null })
      ).toEqual([]);
    });
  });

  describe('getAccount', () => {
    it('should return an Account', () => {
      const appController = app.get<AccountController>(AccountController);
      expect(appController.getAccount('testId')).toEqual({});
    });
  });

  describe('postAccount', () => {
    it('should create a new Account', () => {
      const appController = app.get<AccountController>(AccountController);
      expect(
        appController.postAccount({
          displayName: '',
          email: '',
          organization: '',
          password: '',
        })
      ).toEqual({});
    });
  });

  describe('patchAccount', () => {
    it('should update an existing Account', () => {
      const appController = app.get<AccountController>(AccountController);
      expect(
        appController.patchAccount('testId', {
          displayName: '',
          email: '',
          organization: '',
        })
      ).toEqual({});
    });
  });

  describe('deleteAccount', () => {
    it('should delete an existing Account', () => {
      const appController = app.get<AccountController>(AccountController);
      expect(appController.deleteAccount('testId')).toEqual({});
    });
  });
});
