import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_FIND_ALL_MSMESSAGE,
  ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
  ACCOUNT_FIND_ONE_MSMESSAGE,
  ACCOUNT_MS_KAFKA,
  ACCOUNT_MS_KAFKA_CLIENT_ID,
  ACCOUNT_MS_KAFKA_CONSUMER_GROUP_ID,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { AccountController } from './account.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          protoPath: join(__dirname, 'assets/account/account.proto'),
        },
      },
      {
        name: ACCOUNT_MS_KAFKA,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: ACCOUNT_MS_KAFKA_CLIENT_ID,
            brokers: ['pkc-zm3p0.eu-north-1.aws.confluent.cloud:9092'],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: 'FAXIQ2IFDM43YUGN',
              password:
                '9ftfRFxLckRPnfaGdD+7Ue3TaGsPM+/AsLdvRdhujiQ8o0t/WS8vOSV6OsNXsuyO',
            },
            connectionTimeout: 45000,
          },
          consumer: {
            groupId: ACCOUNT_MS_KAFKA_CONSUMER_GROUP_ID,
          },
          subscribe: {
            fromBeginning: true,
          },
        },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule implements OnModuleInit, OnModuleDestroy {
  @Inject(ACCOUNT_MS_KAFKA) private accountMSClient: ClientKafka;

  async onModuleInit() {
    this.accountMSClient.subscribeToResponseOf(ACCOUNT_FIND_ALL_MSMESSAGE);
    this.accountMSClient.subscribeToResponseOf(ACCOUNT_FIND_ONE_MSMESSAGE);
    this.accountMSClient.subscribeToResponseOf(
      ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE
    );
    await this.accountMSClient.connect();
  }

  async onModuleDestroy() {
    await this.accountMSClient.close();
  }
}
