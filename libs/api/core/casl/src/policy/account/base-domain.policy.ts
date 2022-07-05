import { AccountBaseDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class AccountBaseDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = AccountBaseDomain;
}

export class AccountBaseDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = AccountBaseDomain;
}

export class AccountBaseDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = AccountBaseDomain;
}

export class AccountBaseDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = AccountBaseDomain;
}
