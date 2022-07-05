import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
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
