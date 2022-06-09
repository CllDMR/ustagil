import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { Action } from '../../action.enum';
import { AppAbility } from '../../casl-ability.factory';
import { IPolicyHandler } from '../../policy-handler';

export class CreateSuperAdminDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Create, SuperAdminDomain);
  }
}

export class ReadSuperAdminDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, SuperAdminDomain);
  }
}

export class UpdateSuperAdminDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Update, SuperAdminDomain);
  }
}

export class DeleteSuperAdminDomainPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Delete, SuperAdminDomain);
  }
}
