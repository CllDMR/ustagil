import { Role } from '@ustagil/api/core/common/typing';

export interface SuperAdminGrpc {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
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
  Omit<SuperAdminGrpc, 'id'>,
  'role'
>;

export interface SuperAdminUpdateOneRequest
  extends Partial<Omit<Omit<SuperAdminGrpc, 'id'>, 'role'>> {
  id: string;
}

export interface SuperAdminDeleteOneRequest {
  id: string;
}
