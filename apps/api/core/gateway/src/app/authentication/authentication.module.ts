import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_MS_GRPC,
  ACCOUNT_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import {
  AUTHENTICATION_MS_GRPC,
  AUTHENTICATION_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import { JwtStrategy, LocalStrategy } from '@ustagil/api/core/common/util';
import { join } from 'path';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: AUTHENTICATION_MS_GRPC_URL,
          package: 'authentication',
          protoPath: join(__dirname, 'assets/authentication.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
      {
        name: ACCOUNT_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_MS_GRPC_URL,
          package: 'account',
          protoPath: join(__dirname, 'assets/account/account.proto'),
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
  controllers: [AuthenticationController],
  providers: [LocalStrategy, JwtStrategy],
  exports: [PassportModule, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
