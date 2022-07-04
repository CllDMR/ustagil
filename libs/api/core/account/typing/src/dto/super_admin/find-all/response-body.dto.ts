import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export class SuperAdminFindAllResponseBodyDto {
  super_admins: {
    id: string;
    kind: AccountKind;
    role: Role;
    displayName: string;
    email: string;
  }[];
  next_page_cursor: string;
}
