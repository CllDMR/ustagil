import { Role } from '@ustagil/api/core/common/typing';

export class BaseCreateOneResponseBodyDto {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
}
