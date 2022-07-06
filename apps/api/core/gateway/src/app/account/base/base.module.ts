import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_BASE_MS_GRPC,
  ACCOUNT_BASE_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { ApiCoreCaslModule } from '@ustagil/api/core/casl';
import { join } from 'path';
import { AccountBaseController } from './base.controller';

@Module({
  imports: [
    ApiCoreCaslModule,
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
  controllers: [AccountBaseController],
  providers: [],
})
export class AccountBaseModule {}
