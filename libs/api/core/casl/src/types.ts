import { Ability, InferSubjects } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';
import {
  AccountBaseDomain,
  AccountOrganizationDomain,
  AccountSuperAdminDomain,
  AccountUserDomain,
} from '@ustagil/api/core/account/typing';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof AccountBaseDomain
      | typeof AccountUserDomain
      | typeof AccountOrganizationDomain
      | typeof AccountSuperAdminDomain
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

export interface PolicyRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...rules: PolicyRule[]) =>
  SetMetadata(CHECK_POLICIES_KEY, rules);
