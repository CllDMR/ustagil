import { Role } from '@ustagil/api/core/common/typing';

export interface AccountGrpc {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface AccountFindAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface AccountFindAllResponse {
  accounts: AccountGrpc[];
  next_page_cursor: string;
}

export interface AccountFindOneRequest {
  id: string;
}

export interface AccountFindOneByEmailRequest {
  email: string;
}

export type AccountCreateOneRequest = Omit<Omit<AccountGrpc, 'id'>, 'role'>;

export interface AccountUpdateOneRequest
  extends Partial<Omit<Omit<AccountGrpc, 'id'>, 'role'>> {
  id: string;
}

export interface AccountDeleteOneRequest {
  id: string;
}
