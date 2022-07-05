import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_USER_MS_GRPC,
  ACCOUNT_USER_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { ApiCoreCaslModule } from '@ustagil/api/core/casl';
import { join } from 'path';
import { AccountUserController } from './user.controller';

@Module({
  imports: [
    ApiCoreCaslModule,
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
  controllers: [AccountUserController],
  providers: [],
})
export class AccountUserModule {}
