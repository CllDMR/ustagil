import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_SUPER_ADMIN_MS_GRPC,
  ACCOUNT_SUPER_ADMIN_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import {
  AUTHENTICATION_SUPER_ADMIN_MS_GRPC,
  AUTHENTICATION_SUPER_ADMIN_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import { JwtStrategy, LocalStrategy } from '@ustagil/api/core/common/util';
import { join } from 'path';
import { AuthenticationSuperAdminController } from './super_admin.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_SUPER_ADMIN_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: AUTHENTICATION_SUPER_ADMIN_MS_GRPC_URL,
          package: 'authentication_super_admin',
          protoPath: join(__dirname, 'assets/authentication/super_admin.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
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
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthenticationSuperAdminController],
  providers: [LocalStrategy, JwtStrategy],
  exports: [PassportModule, LocalStrategy, JwtStrategy],
})
export class AuthenticationSuperAdminModule {}
