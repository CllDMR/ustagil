import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AccountController } from './account.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          protoPath: join(__dirname, 'assets/account/account.proto'),
        },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
