import { AccountKind, Role } from '@ustagil/api/core/common/typing';

export interface BaseGrpc {
  id: string;
  kind: AccountKind;
  role: Role;
  displayName: string;
  email: string;
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

export type BaseCreateOneRequest = Omit<
  Omit<Omit<BaseGrpc, 'id'>, 'role'>,
  'kind'
>;

export interface BaseUpdateOneRequest extends Partial<BaseCreateOneRequest> {
  id: string;
}

export interface BaseDeleteOneRequest {
  id: string;
}
