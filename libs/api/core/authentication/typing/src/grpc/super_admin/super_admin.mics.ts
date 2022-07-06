import { Role } from '@ustagil/api/core/common/typing';

export interface AuthenticationSuperAdminRegisterAccountRequest {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthenticationSuperAdminLoginAccountRequest {
  id: string;
  role: Role;
}

export interface AuthenticationSuperAdminLoginAccountResponse {
  access_token: string;
}

export interface AuthenticationSuperAdminValidateAccountRequest {
  email: string;
  password: string;
}
