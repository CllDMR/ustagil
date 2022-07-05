import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_BASE_MS_GRPC,
  ACCOUNT_BASE_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { AuthenticationBaseController } from './base.controller';
import { AuthenticationBaseCommandHandlers } from './command';
import { AuthenticationBaseEventHandlers } from './event';
import { AuthenticationBaseQueryHandlers } from './query';

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
        name: ACCOUNT_BASE_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_BASE_MS_GRPC_URL,
          package: 'account_base',
          protoPath: join(__dirname, 'assets/account/base.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthenticationBaseController],
  providers: [
    ...AuthenticationBaseCommandHandlers,
    ...AuthenticationBaseEventHandlers,
    ...AuthenticationBaseQueryHandlers,
  ],
})
export class AuthenticationBaseModule {}
