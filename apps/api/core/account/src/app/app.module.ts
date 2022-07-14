import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import {
  cloudinaryConfig,
  jwtConfig,
  mongoConfig,
  rateLimitConfig,
} from '../config';
import { AccountBaseModule } from './base/base.module';
import { AccountOrganizationModule } from './organization/organization.module';
import { AccountSuperAdminModule } from './super_admin/super_admin.module';
import { AccountUserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      load: [cloudinaryConfig, jwtConfig, mongoConfig, rateLimitConfig],
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        RATE_LIMIT_TTL: Joi.number().required(),
        RATE_LIMIT_LIMIT: Joi.number().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.number().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
        CLOUDINARY_FOLDER_NAME: Joi.string().required(),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [mongoConfig.KEY],
      useFactory: async (config: ConfigType<typeof mongoConfig>) => ({
        uri: config.uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),

    AccountBaseModule,
    AccountOrganizationModule,
    AccountSuperAdminModule,
    AccountUserModule,
  ],
  providers: [],
})
export class AccountModule {}
