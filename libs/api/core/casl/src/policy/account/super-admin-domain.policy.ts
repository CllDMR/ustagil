import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class SuperAdminDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = SuperAdminDomain;
}

export class SuperAdminDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = SuperAdminDomain;
}

export class SuperAdminDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = SuperAdminDomain;
}

export class SuperAdminDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = SuperAdminDomain;
}
