import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_SUPER_ADMIN_MS_GRPC,
  ACCOUNT_SUPER_ADMIN_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { ApiCoreCaslModule } from '@ustagil/api/core/casl';
import { join } from 'path';
import { AccountSuperAdminController } from './super_admin.controller';

@Module({
  imports: [
    ApiCoreCaslModule,
    ClientsModule.register([
      {
        name: ACCOUNT_SUPER_ADMIN_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_SUPER_ADMIN_MS_GRPC_URL,
          package: 'account_super_admin',
          protoPath: join(__dirname, 'assets/account/super_admin.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AccountSuperAdminController],
  providers: [],
})
export class AccountSuperAdminModule {}
