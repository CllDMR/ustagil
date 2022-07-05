import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ACCOUNT_ORGANIZATION_MS_GRPC,
  ACCOUNT_ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { ApiCoreCaslModule } from '@ustagil/api/core/casl';
import { join } from 'path';
import { AccountOrganizationController } from './organization.controller';

@Module({
  imports: [
    ApiCoreCaslModule,
    ClientsModule.register([
      {
        name: ACCOUNT_ORGANIZATION_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_ORGANIZATION_MS_GRPC_URL,
          package: 'account_organization',
          protoPath: join(__dirname, 'assets/account/organization.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [AccountOrganizationController],
  providers: [],
})
export class AccountOrganizationModule {}
