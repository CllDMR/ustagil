import { AccountOrganizationDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class AccountOrganizationDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = AccountOrganizationDomain;
}

export class AccountOrganizationDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = AccountOrganizationDomain;
}

export class AccountOrganizationDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = AccountOrganizationDomain;
}

export class AccountOrganizationDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = AccountOrganizationDomain;
}
