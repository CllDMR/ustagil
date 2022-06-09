import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  SUPER_ADMIN_MS_GRPC,
  SUPER_ADMIN_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { SuperAdminController } from './super_admin.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SUPER_ADMIN_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: SUPER_ADMIN_MS_GRPC_URL,
          package: 'superAdmin',
          protoPath: join(__dirname, 'assets/account/super_admin.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [SuperAdminController],
  providers: [],
})
export class SuperAdminModule {}
