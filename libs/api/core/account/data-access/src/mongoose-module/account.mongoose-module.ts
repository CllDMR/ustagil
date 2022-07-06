import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountKind } from '@ustagil/api/core/common/typing';
import {
  AccountBase,
  AccountBaseSchema,
  AccountOrganization,
  AccountOrganizationSchema,
  AccountSuperAdmin,
  AccountSuperAdminSchema,
  AccountUser,
  AccountUserSchema,
} from '../schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AccountBase.name,
        schema: AccountBaseSchema,
        discriminators: [
          {
            name: AccountOrganization.name,
            schema: AccountOrganizationSchema,
            value: AccountKind.ACCOUNT_KIND_ORGANIZATION.toString(),
          },
          {
            name: AccountSuperAdmin.name,
            schema: AccountSuperAdminSchema,
            value: AccountKind.ACCOUNT_KIND_SUPER_ADMIN.toString(),
          },
          {
            name: AccountUser.name,
            schema: AccountUserSchema,
            value: AccountKind.ACCOUNT_KIND_USER.toString(),
          },
        ],
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class AccountMongooseModule {}
