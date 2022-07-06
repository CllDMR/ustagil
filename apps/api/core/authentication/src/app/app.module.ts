import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    }),

    AuthenticationBaseModule,
    AuthenticationOrganizationModule,
    AuthenticationSuperAdminModule,
    AuthenticationUserModule,
  ],
})
export class AuthenticationModule {}
