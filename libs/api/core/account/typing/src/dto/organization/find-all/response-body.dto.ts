import { Role } from '@ustagil/api/core/common/typing';

export class OrganizationFindAllResponseBodyDto {
  organizations: {
    id: string;
    role: Role;
    displayName: string;
    email: string;
    organization: string;
  }[];
  next_page_cursor: string;
}
