import { Role } from '@ustagil/api/core/common/typing';

export interface AuthenticationUserRegisterAccountRequest {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthenticationUserLoginAccountRequest {
  id: string;
  role: Role;
}

export interface AuthenticationUserLoginAccountResponse {
  access_token: string;
}

export interface AuthenticationUserValidateAccountRequest {
  email: string;
  password: string;
}
