import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

    BaseModule,
    OrganizationModule,
    SuperAdminModule,
    UserModule,
  ],
})
export class AppModule {}
