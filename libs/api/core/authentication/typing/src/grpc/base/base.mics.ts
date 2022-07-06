import { Role } from '@ustagil/api/core/common/typing';

export interface AuthenticationBaseRegisterAccountRequest {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthenticationBaseLoginAccountRequest {
  id: string;
  role: Role;
}

export interface AuthenticationBaseLoginAccountResponse {
  access_token: string;
}

export interface AuthenticationBaseValidateAccountRequest {
  email: string;
  password: string;
}
