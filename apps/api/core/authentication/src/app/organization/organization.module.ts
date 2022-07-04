import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  BASE_MS_GRPC,
  BASE_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { OrganizationCommandHandlers } from './command';
import { OrganizationEventHandlers } from './event';
import { OrganizationController } from './organization.controller';
import { OrganizationQueryHandlers } from './query';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    ClientsModule.register([
      {
        name: BASE_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: BASE_MS_GRPC_URL,
          package: 'organization',
          protoPath: join(__dirname, 'assets/account/organization.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [
    ...OrganizationCommandHandlers,
    ...OrganizationEventHandlers,
    ...OrganizationQueryHandlers,
  ],
})
export class OrganizationModule {}
