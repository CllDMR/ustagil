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
import { SuperAdminCommandHandlers } from './command';
import { SuperAdminEventHandlers } from './event';
import { SuperAdminQueryHandlers } from './query';
import { SuperAdminController } from './super_admin.controller';

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
          package: 'super_admin',
          protoPath: join(__dirname, 'assets/account/super_admin.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [SuperAdminController],
  providers: [
    ...SuperAdminCommandHandlers,
    ...SuperAdminEventHandlers,
    ...SuperAdminQueryHandlers,
  ],
})
export class SuperAdminModule {}
