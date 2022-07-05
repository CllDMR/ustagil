import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface AccountUserGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  password: string;
}

export interface AccountUserReadAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface AccountUserReadAllResponse {
  users: AccountUserGrpc[];
  next_page_cursor: string;
}

export interface AccountUserReadOneRequest {
  id: string;
}

export interface AccountUserReadOneByEmailRequest {
  email: string;
}

export type AccountUserCreateOneRequest = Omit<
  Omit<Omit<AccountUserGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface AccountUserUpdateOneRequest
  extends Partial<AccountUserCreateOneRequest> {
  id: string;
}

export interface AccountUserDeleteOneRequest {
  id: string;
}
