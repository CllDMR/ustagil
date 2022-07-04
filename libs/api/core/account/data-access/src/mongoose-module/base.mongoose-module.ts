import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountKind } from '@ustagil/api/core/common/typing';
import {
  Base,
  BaseSchema,
  Organization,
  OrganizationSchema,
  SuperAdmin,
  SuperAdminSchema,
  User,
  UserSchema,
} from '../schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Base.name,
        schema: BaseSchema,
        discriminators: [
          {
            name: Organization.name,
            schema: OrganizationSchema,
            value: AccountKind.ACCOUNT_KIND_ORGANIZATION.toString(),
          },
          {
            name: SuperAdmin.name,
            schema: SuperAdminSchema,
            value: AccountKind.ACCOUNT_KIND_SUPER_ADMIN.toString(),
          },
          {
            name: User.name,
            schema: UserSchema,
            value: AccountKind.ACCOUNT_KIND_USER.toString(),
          },
        ],
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class BaseMongooseModule {}
