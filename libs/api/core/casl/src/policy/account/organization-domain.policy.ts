import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { Action } from '../../action.enum';
import { AppAbility } from '../../casl-ability.factory';
import { IPolicyHandler } from '../../policy-handler';

export class CreateOrganizationDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, OrganizationDomain);
  }
}

export class ReadOrganizationDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, OrganizationDomain);
  }
}

export class UpdateOrganizationDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, OrganizationDomain);
  }
}

export class DeleteOrganizationDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, OrganizationDomain);
  }
}
