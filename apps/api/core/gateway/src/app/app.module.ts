import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import { AccountBaseModule } from './account/base/base.module';
import { AccountOrganizationModule } from './account/organization/organization.module';
import { AccountSuperAdminModule } from './account/super_admin/super_admin.module';
import { AccountUserModule } from './account/user/user.module';
import { AuthenticationBaseModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ttl: config.get('RATE_LIMIT_TTL'),
        limit: config.get('RATE_LIMIT_LIMIT'),
      }),
    }),

    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),

    AccountBaseModule,
    AccountOrganizationModule,
    AccountSuperAdminModule,
    AccountUserModule,
    AuthenticationBaseModule,
  ],
})
export class GatewayModule {}
