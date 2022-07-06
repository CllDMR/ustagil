import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface AccountBaseGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  password: string;
}

export interface AccountBaseReadAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface AccountBaseReadAllResponse {
  bases: AccountBaseGrpc[];
  next_page_cursor: string;
}

export interface AccountBaseReadOneRequest {
  id: string;
}

export interface AccountBaseReadOneByEmailRequest {
  email: string;
}

export type AccountBaseCreateOneRequest = Omit<
  Omit<Omit<AccountBaseGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface AccountBaseUpdateOneRequest
  extends Partial<AccountBaseCreateOneRequest> {
  id: string;
}

export interface AccountBaseDeleteOneRequest {
  id: string;
}
