import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_BASE_MS_GRPC,
  ACCOUNT_BASE_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import {
  AUTHENTICATION_BASE_MS_GRPC,
  AUTHENTICATION_BASE_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import {
  BaseJwtStrategy,
  BaseLocalStrategy,
} from '@ustagil/api/core/common/util';
import { join } from 'path';
import { AuthenticationBaseController } from './base.controller';

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
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationBaseController],
  providers: [BaseLocalStrategy, BaseJwtStrategy],
  exports: [PassportModule, BaseLocalStrategy, BaseJwtStrategy],
})
export class AuthenticationBaseModule {}