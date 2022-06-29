import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  BASE_MS_GRPC,
  BASE_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { ApiCoreCaslModule } from '@ustagil/api/core/casl';
import { join } from 'path';
import { BaseController } from './base.controller';

@Module({
  imports: [
    ApiCoreCaslModule,
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
  controllers: [BaseController],
  providers: [],
})
export class BaseModule {}
