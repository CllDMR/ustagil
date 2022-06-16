import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORGANIZATION_MS_GRPC,
  ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { ApiCoreCaslModule } from '@ustagil/api/core/casl';
import { join } from 'path';
import { OrganizationController } from './organization.controller';

@Module({
  imports: [
    ApiCoreCaslModule,
    ClientsModule.register([
      {
        name: ORGANIZATION_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ORGANIZATION_MS_GRPC_URL,
          package: 'organization',
          protoPath: join(__dirname, 'assets/account/organization.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [],
})
export class OrganizationModule {}
