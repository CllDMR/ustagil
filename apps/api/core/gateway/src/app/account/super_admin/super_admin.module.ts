import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SuperAdminController } from './super_admin.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SUPER_ADMIN_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          protoPath: join(__dirname, 'assets/account/super_admin.proto'),
        },
      },
    ]),
  ],
  controllers: [SuperAdminController],
  providers: [],
})
export class SuperAdminModule {}
