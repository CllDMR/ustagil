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
import { UserCommandHandlers } from './command';
import { UserEventHandlers } from './event';
import { UserQueryHandlers } from './query';
import { UserController } from './user.controller';

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
          package: 'user',
          protoPath: join(__dirname, 'assets/account/user.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    ...UserCommandHandlers,
    ...UserEventHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
