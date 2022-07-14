import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_USER_MS_GRPC,
  ACCOUNT_USER_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import {
  AUTHENTICATION_USER_MS_GRPC,
  AUTHENTICATION_USER_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import {
  UserJwtStrategy,
  UserLocalStrategy,
} from '@ustagil/api/core/common/util';
import { join } from 'path';
import { jwtConfig } from '../../../config';
import { AuthenticationUserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTHENTICATION_USER_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: AUTHENTICATION_USER_MS_GRPC_URL,
          package: 'authentication_user',
          protoPath: join(__dirname, 'assets/authentication/user.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
      {
        name: ACCOUNT_USER_MS_GRPC,
        transport: Transport.GRPC,
        options: {
          url: ACCOUNT_USER_MS_GRPC_URL,
          package: 'account_user',
          protoPath: join(__dirname, 'assets/account/user.proto'),
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
  controllers: [AuthenticationUserController],
  providers: [UserLocalStrategy, UserJwtStrategy],
  exports: [PassportModule, UserLocalStrategy, UserJwtStrategy],
})
export class AuthenticationUserModule {}
