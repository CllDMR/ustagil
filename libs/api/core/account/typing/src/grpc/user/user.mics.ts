import { Role } from '@ustagil/api/core/common/typing';

export interface UserGrpc {
  id: string;
  role: Role;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface UserFindAllRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface UserFindAllResponse {
  users: UserGrpc[];
  next_page_cursor: string;
}

export interface UserFindOneRequest {
  id: string;
}

export interface UserFindOneByEmailRequest {
  email: string;
}

export type UserCreateOneRequest = Omit<Omit<UserGrpc, 'id'>, 'role'>;

export interface UserUpdateOneRequest
  extends Partial<Omit<Omit<UserGrpc, 'id'>, 'role'>> {
  id: string;
}

export interface UserDeleteOneRequest {
  id: string;
}
