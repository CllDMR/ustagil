import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrganizationController } from './organization.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_ORGANIZATION_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'account',
          protoPath: join(__dirname, 'assets/account/organization.proto'),
        },
      },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [],
})
export class OrganizationModule {}
