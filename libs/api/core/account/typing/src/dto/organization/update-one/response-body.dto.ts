import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export class OrganizationUpdateOneResponseBodyDto {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
}