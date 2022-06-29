import { Ability, InferSubjects } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';
import {
  BaseDomain,
  OrganizationDomain,
  SuperAdminDomain,
  UserDomain,
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
      | typeof BaseDomain
      | typeof UserDomain
      | typeof OrganizationDomain
      | typeof SuperAdminDomain
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
