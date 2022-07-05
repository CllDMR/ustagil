import { Role } from '@ustagil/api/core/common/typing';

export interface AuthenticationOrganizationRegisterAccountRequest {
  displayName: string;
  email: string;
  password: string;
  organization: string;
}

export interface AuthenticationOrganizationLoginAccountRequest {
  id: string;
  email: string;
  displayName: string;
  role: Role;
}

export interface AuthenticationOrganizationLoginAccountResponse {
  access_token: string;
}

export interface AuthenticationOrganizationValidateAccountRequest {
  email: string;
  password: string;
}
