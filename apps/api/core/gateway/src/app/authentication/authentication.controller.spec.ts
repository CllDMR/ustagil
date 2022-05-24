import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AUTHENTICATION_MS,
  AUTHENTICATION_MS_CLIENT_ID,
  AUTHENTICATION_MS_CONSUMER_GROUP_ID,
} from '@ustagil/api/core/authentication/constant';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthenticationController],
      imports: [
        ClientsModule.register([
          {
            name: AUTHENTICATION_MS,
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: AUTHENTICATION_MS_CLIENT_ID,
                brokers: ['localhost:9092'],
              },
              consumer: {
                groupId: AUTHENTICATION_MS_CONSUMER_GROUP_ID,
              },
            },
          },
        ]),
      ],
    }).compile();
  });

  describe('login', () => {
    it('should login account with credentials', () => {
      const appController = app.get<AuthenticationController>(
        AuthenticationController
      );
      expect(
        appController.login({
          displayName: '',
          email: '',
          organization: '',
        })
      ).toEqual({});
    });
  });

  describe('registerAccount', () => {
    it('should register account with credentials', () => {
      const appController = app.get<AuthenticationController>(
        AuthenticationController
      );
      expect(
        appController.registerAccount({
          displayName: '',
          email: '',
          organization: '',
          password: '',
        })
      ).toEqual({});
    });
  });

  describe('getProfile', () => {
    it('should register account with credentials', () => {
      const appController = app.get<AuthenticationController>(
        AuthenticationController
      );

      const req = new Request('http:/localhost:3000/api');
      req.headers.append('Authorization', 'Bearer XXX');

      expect(appController.getProfile(req)).toEqual({});
    });
  });
});
