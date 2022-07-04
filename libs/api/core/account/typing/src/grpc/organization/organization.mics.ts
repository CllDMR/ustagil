import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface OrganizationGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface OrganizationFindAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface OrganizationFindAllResponse {
  organizations: OrganizationGrpc[];
  next_page_cursor: string;
}

export interface OrganizationFindOneRequest {
  id: string;
}

export interface OrganizationFindOneByEmailRequest {
  email: string;
}

export type OrganizationCreateOneRequest = Omit<
  Omit<Omit<OrganizationGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface OrganizationUpdateOneRequest
  extends Partial<OrganizationCreateOneRequest> {
  id: string;
}

export interface OrganizationDeleteOneRequest {
  id: string;
}
