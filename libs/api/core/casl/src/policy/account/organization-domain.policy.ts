import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { Action, PolicyRule } from '../../types';

export class OrganizationDomainCreatePolicyRule implements PolicyRule {
  action = Action.Create;
  subject = OrganizationDomain;
}

export class OrganizationDomainReadPolicyRule implements PolicyRule {
  action = Action.Read;
  subject = OrganizationDomain;
}

export class OrganizationDomainUpdatePolicyRule implements PolicyRule {
  action = Action.Update;
  subject = OrganizationDomain;
}

export class OrganizationDomainDeletePolicyRule implements PolicyRule {
  action = Action.Delete;
  subject = OrganizationDomain;
}
