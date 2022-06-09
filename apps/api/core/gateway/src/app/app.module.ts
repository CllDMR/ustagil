import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AccountModule } from './account/account/account.module';
import { OrganizationModule } from './account/organization/organization.module';
import { SuperAdminModule } from './account/super_admin/super_admin.module';
import { UserModule } from './account/user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

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

    AccountModule,
    OrganizationModule,
    SuperAdminModule,
    UserModule,
    AuthenticationModule,
  ],
})
export class GatewayModule {}
