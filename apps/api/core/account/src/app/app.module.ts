import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BaseModule } from './base/base.module';
import { OrganizationModule } from './organization/organization.module';
import { SuperAdminModule } from './super_admin/super_admin.module';
import { UserModule } from './user/user.module';

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

    BaseModule,
    OrganizationModule,
    SuperAdminModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
