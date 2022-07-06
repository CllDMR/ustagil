import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_BASE_MS_GRPC,
  ACCOUNT_BASE_MS_GRPC_URL,
  ACCOUNT_ORGANIZATION_MS_GRPC,
  ACCOUNT_ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import {
  AUTHENTICATION_BASE_MS_GRPC,
  AUTHENTICATION_BASE_MS_GRPC_URL,
  AUTHENTICATION_ORGANIZATION_MS_GRPC,
  AUTHENTICATION_ORGANIZATION_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import { JwtStrategy, LocalStrategy } from '@ustagil/api/core/common/util';
import { join } from 'path';
import { AuthenticationOrganizationController } from './organization.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_BASE_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: AUTHENTICATION_BASE_MS_GRPC_URL,
          package: 'authentication_base',
          protoPath: join(__dirname, 'assets/authentication/base.proto'),
          loader: {
            keepCase: true,
          },
        },
      },

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
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationOrganizationController],
  providers: [LocalStrategy, JwtStrategy],
  exports: [PassportModule, LocalStrategy, JwtStrategy],
})
export class AuthenticationOrganizationModule {}
