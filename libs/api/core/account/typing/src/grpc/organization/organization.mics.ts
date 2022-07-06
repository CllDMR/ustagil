import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface AccountOrganizationGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface AccountOrganizationReadAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface AccountOrganizationReadAllResponse {
  organizations: AccountOrganizationGrpc[];
  next_page_cursor: string;
}

export interface AccountOrganizationReadOneRequest {
  id: string;
}

export interface AccountOrganizationReadOneByEmailRequest {
  email: string;
}

export type AccountOrganizationCreateOneRequest = Omit<
  Omit<Omit<AccountOrganizationGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface AccountOrganizationUpdateOneRequest
  extends Partial<AccountOrganizationCreateOneRequest> {
  id: string;
}

export interface AccountOrganizationDeleteOneRequest {
  id: string;
}
