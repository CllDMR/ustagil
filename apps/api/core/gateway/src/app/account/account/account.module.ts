import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_MS_GRPC,
  ACCOUNT_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { AccountController } from './account.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ACCOUNT_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_MS_GRPC_URL,
          package: 'account',
          protoPath: join(__dirname, 'assets/account/account.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
