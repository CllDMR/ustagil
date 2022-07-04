import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface SuperAdminGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
  password: string;
}

export interface SuperAdminFindAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface SuperAdminFindAllResponse {
  super_admins: SuperAdminGrpc[];
  next_page_cursor: string;
}

export interface SuperAdminFindOneRequest {
  id: string;
}

export interface SuperAdminFindOneByEmailRequest {
  email: string;
}

export type SuperAdminCreateOneRequest = Omit<
  Omit<Omit<SuperAdminGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface SuperAdminUpdateOneRequest
  extends Partial<SuperAdminCreateOneRequest> {
  id: string;
}

export interface SuperAdminDeleteOneRequest {
  id: string;
}
