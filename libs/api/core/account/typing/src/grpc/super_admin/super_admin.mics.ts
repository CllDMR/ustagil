import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface AccountSuperAdminGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  password: string;
}

export interface AccountSuperAdminReadAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface AccountSuperAdminReadAllResponse {
  super_admins: AccountSuperAdminGrpc[];
  next_page_cursor: string;
}

export interface AccountSuperAdminReadOneRequest {
  id: string;
}

export interface AccountSuperAdminReadOneByEmailRequest {
  email: string;
}

export type AccountSuperAdminCreateOneRequest = Omit<
  Omit<Omit<AccountSuperAdminGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface AccountSuperAdminUpdateOneRequest
  extends Partial<AccountSuperAdminCreateOneRequest> {
  id: string;
}

export interface AccountSuperAdminDeleteOneRequest {
  id: string;
}
