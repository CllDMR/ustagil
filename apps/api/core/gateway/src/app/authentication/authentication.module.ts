import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  AUTHENTICATION_LOGIN_ACCOUNT_MSMESSAGE,
  AUTHENTICATION_MS,
  AUTHENTICATION_MS_CLIENT_ID,
  AUTHENTICATION_MS_CONSUMER_GROUP_ID,
  AUTHENTICATION_REGISTER_ACCOUNT_MSMESSAGE,
  AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE,
} from '@ustagil/api/core/authentication/constant';
import { JwtStrategy, LocalStrategy } from '@ustagil/api/core/common/util';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_MS,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: AUTHENTICATION_MS_CLIENT_ID,
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
            groupId: AUTHENTICATION_MS_CONSUMER_GROUP_ID,
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
  providers: [LocalStrategy, JwtStrategy],
  exports: [PassportModule, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule implements OnModuleInit, OnModuleDestroy {
  @Inject(AUTHENTICATION_MS) private authenticationMSClient: ClientKafka;

  async onModuleInit() {
    this.authenticationMSClient.subscribeToResponseOf(
      AUTHENTICATION_LOGIN_ACCOUNT_MSMESSAGE
    );
    this.authenticationMSClient.subscribeToResponseOf(
      AUTHENTICATION_VALIDATE_ACCOUNT_MSMESSAGE
    );
    this.authenticationMSClient.subscribeToResponseOf(
      AUTHENTICATION_REGISTER_ACCOUNT_MSMESSAGE
    );
    await this.authenticationMSClient.connect();
  }

  async onModuleDestroy() {
    await this.authenticationMSClient.close();
  }
}
