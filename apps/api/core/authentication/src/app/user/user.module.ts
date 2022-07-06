import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_USER_MS_GRPC,
  ACCOUNT_USER_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { AuthenticationUserCommandHandlers } from './command';
import { AuthenticationUserEventHandlers } from './event';
import { AuthenticationUserQueryHandlers } from './query';
import { AuthenticationUserController } from './user.controller';

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
        name: ACCOUNT_USER_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_USER_MS_GRPC_URL,
          package: 'account_user',
          protoPath: join(__dirname, 'assets/account/user.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AuthenticationUserController],
  providers: [
    ...AuthenticationUserCommandHandlers,
    ...AuthenticationUserEventHandlers,
    ...AuthenticationUserQueryHandlers,
  ],
})
export class AuthenticationUserModule {}
