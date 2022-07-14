import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  cloudinaryConfig,
  jwtConfig,
  mongoConfig,
  rateLimitConfig,
} from '../config';
import { AuthenticationBaseModule } from './base/base.module';
import { AuthenticationOrganizationModule } from './organization/organization.module';
import { AuthenticationSuperAdminModule } from './super_admin/super_admin.module';
import { AuthenticationUserModule } from './user/user.module';

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

    AuthenticationBaseModule,
    AuthenticationOrganizationModule,
    AuthenticationSuperAdminModule,
    AuthenticationUserModule,
  ],
})
export class AuthenticationModule {}
