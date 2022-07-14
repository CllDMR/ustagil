import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_ORGANIZATION_MS_GRPC,
  ACCOUNT_ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { jwtConfig } from '../../config';
import { AuthenticationOrganizationCommandHandlers } from './command';
import { AuthenticationOrganizationEventHandlers } from './event';
import { AuthenticationOrganizationController } from './organization.controller';
import { AuthenticationOrganizationQueryHandlers } from './query';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
    ClientsModule.register([
      {
        name: ACCOUNT_ORGANIZATION_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_ORGANIZATION_MS_GRPC_URL,
          package: 'account_organization',
          protoPath: join(__dirname, 'assets/account/organization.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthenticationOrganizationController],
  providers: [
    ...AuthenticationOrganizationCommandHandlers,
    ...AuthenticationOrganizationEventHandlers,
    ...AuthenticationOrganizationQueryHandlers,
  ],
})
export class AuthenticationOrganizationModule {}
