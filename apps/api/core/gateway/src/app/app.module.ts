import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { jwtConfig, rateLimitConfig } from '../config';
import { AccountBaseModule } from './account/base/base.module';
import { AccountOrganizationModule } from './account/organization/organization.module';
import { AccountSuperAdminModule } from './account/super_admin/super_admin.module';
import { AccountUserModule } from './account/user/user.module';
import { AuthenticationBaseModule } from './authentication/base/base.module';
import { AuthenticationOrganizationModule } from './authentication/organization/organization.module';
import { AuthenticationSuperAdminModule } from './authentication/super_admin/super_admin.module';
import { AuthenticationUserModule } from './authentication/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      load: [rateLimitConfig, jwtConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        RATE_LIMIT_TTL: Joi.number().required(),
        RATE_LIMIT_LIMIT: Joi.number().required(),
      }),
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [rateLimitConfig.KEY],
      useFactory: async (config: ConfigType<typeof rateLimitConfig>) => ({
        ttl: Number(config.ttl),
        limit: Number(config.limit),
      }),
    }),

    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => ({
        secret: config.secret,
        signOptions: { expiresIn: '60m' },
      }),
    }),

    AccountBaseModule,
    AccountOrganizationModule,
    AccountSuperAdminModule,
    AccountUserModule,

    AuthenticationBaseModule,
    AuthenticationUserModule,
    AuthenticationOrganizationModule,
    AuthenticationSuperAdminModule,
  ],
})
export class GatewayModule {}
