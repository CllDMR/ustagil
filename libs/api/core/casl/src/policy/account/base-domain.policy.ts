import { BaseDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class BaseDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = BaseDomain;
}

export class BaseDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = BaseDomain;
}

export class BaseDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = BaseDomain;
}

export class BaseDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = BaseDomain;
}
