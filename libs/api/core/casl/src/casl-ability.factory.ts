import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import {
  AccountDomain,
  OrganizationDomain,
  SuperAdminDomain,
  UserDomain,
} from '@ustagil/api/core/account/typing';
import { MyRequest, Role } from '@ustagil/api/core/common/typing';
import { Action, AppAbility, Subjects } from './types';

@Injectable()
export class CaslAbilityFactory {
  createForAccount(account: MyRequest['user'], paramAccountId?: string) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    can(Action.Manage, 'all'); // read-only access to everything

    // JWT payload account and url param account is matching

    if (paramAccountId && account.id !== paramAccountId) {
      cannot(Action.Manage, 'all');
    }

    // JWT payload user and url param user is matching

    // if (metaData.userId)
    //   if (!user.user_id || user.user_id.toHexString() !== metaData.userId) {
    //     cannot(Action.Manage, 'all');
    //   }

    // Role Base Authorization Example

    if (account.role === Role.ROLE_ACCOUNT) {
      cannot(Action.Read, [AccountDomain]).because('Sanane lan');
    } else if (account.role === Role.ROLE_ORGANIZATION) {
      cannot(Action.Read, [OrganizationDomain]);
    } else if (account.role === Role.ROLE_SUPER_ADMIN) {
      cannot(Action.Read, [SuperAdminDomain]);
    } else if (account.role === Role.ROLE_USER) {
      cannot(Action.Read, [UserDomain]);
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
