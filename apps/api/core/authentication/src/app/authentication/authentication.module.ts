import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE,
  ACCOUNT_MS_KAFKA,
  ACCOUNT_MS_KAFKA_CLIENT_ID,
  ACCOUNT_MS_KAFKA_CONSUMER_GROUP_ID,
} from '@ustagil/api/core/account/constant';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationCommandHandlers } from './command';
import { AuthenticationEventHandlers } from './event';
import { AuthenticationQueryHandlers } from './query';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
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
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    ...AuthenticationCommandHandlers,
    ...AuthenticationEventHandlers,
    ...AuthenticationQueryHandlers,
  ],
})
export class AuthenticationModule implements OnModuleInit, OnModuleDestroy {
  @Inject(ACCOUNT_MS_KAFKA) private accountMSClient: ClientKafka;

  async onModuleInit() {
    this.accountMSClient.subscribeToResponseOf(
      ACCOUNT_FIND_ONE_BY_EMAIL_MSMESSAGE
    );
    await this.accountMSClient.connect();
  }

  async onModuleDestroy() {
    await this.accountMSClient.close();
  }
}
