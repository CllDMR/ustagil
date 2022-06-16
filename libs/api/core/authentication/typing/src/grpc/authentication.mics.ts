import { Role } from '@ustagil/api/core/common/typing';

export interface RegisterAccountRequest {
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface LoginAccountRequest {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  organization: string;
}

export interface LoginAccountResponse {
  access_token: string;
}

export interface ValidateAccountRequest {
  email: string;
  password: string;
}
