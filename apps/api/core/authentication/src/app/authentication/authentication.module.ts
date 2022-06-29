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
import { AuthenticationController } from './authentication.controller';
import { AuthenticationCommandHandlers } from './command';
import { AuthenticationEventHandlers } from './event';
import { AuthenticationQueryHandlers } from './query';

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
          package: 'base',
          protoPath: join(__dirname, 'assets/account/base.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [
    ...AuthenticationCommandHandlers,
    ...AuthenticationEventHandlers,
    ...AuthenticationQueryHandlers,
  ],
})
export class AuthenticationModule {}
