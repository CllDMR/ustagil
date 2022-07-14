import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import {
  ACCOUNT_SUPER_ADMIN_MS_GRPC,
  ACCOUNT_SUPER_ADMIN_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { jwtConfig } from '../../config';
import { AuthenticationSuperAdminCommandHandlers } from './command';
import { AuthenticationSuperAdminEventHandlers } from './event';
import { AuthenticationSuperAdminQueryHandlers } from './query';
import { AuthenticationSuperAdminController } from './super_admin.controller';

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: '60m' },
      }),
    }),
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
  controllers: [AuthenticationSuperAdminController],
  providers: [
    ...AuthenticationSuperAdminCommandHandlers,
    ...AuthenticationSuperAdminEventHandlers,
    ...AuthenticationSuperAdminQueryHandlers,
  ],
})
export class AuthenticationSuperAdminModule {}
