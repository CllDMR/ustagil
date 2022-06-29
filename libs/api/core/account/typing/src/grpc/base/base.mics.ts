import { Role } from '@ustagil/api/core/common/typing';

export interface BaseGrpc {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface BaseFindAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface BaseFindAllResponse {
  bases: BaseGrpc[];
  next_page_cursor: string;
}

export interface BaseFindOneRequest {
  id: string;
}

export interface BaseFindOneByEmailRequest {
  email: string;
}

export type BaseCreateOneRequest = Omit<Omit<BaseGrpc, 'id'>, 'role'>;

export interface BaseUpdateOneRequest
  extends Partial<Omit<Omit<BaseGrpc, 'id'>, 'role'>> {
  id: string;
}

export interface BaseDeleteOneRequest {
  id: string;
}
