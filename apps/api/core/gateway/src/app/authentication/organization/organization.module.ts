import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_ORGANIZATION_MS_GRPC,
  ACCOUNT_ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import {
  AUTHENTICATION_ORGANIZATION_MS_GRPC,
  AUTHENTICATION_ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import {
  OrganizationJwtStrategy,
  OrganizationLocalStrategy,
} from '@ustagil/api/core/common/util';
import { join } from 'path';
import { jwtConfig } from '../../../config';
import { AuthenticationOrganizationController } from './organization.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_ORGANIZATION_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: AUTHENTICATION_ORGANIZATION_MS_GRPC_URL,
          package: 'authentication_organization',
          protoPath: join(
            __dirname,
            'assets/authentication/organization.proto'
          ),
          loader: {
            keepCase: true,
          },
        },
      },
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
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [AuthenticationOrganizationController],
  providers: [OrganizationLocalStrategy, OrganizationJwtStrategy],
  exports: [PassportModule, OrganizationLocalStrategy, OrganizationJwtStrategy],
})
export class AuthenticationOrganizationModule {}
