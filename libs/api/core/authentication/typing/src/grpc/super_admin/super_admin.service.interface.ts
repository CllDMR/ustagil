import { AuthenticationSuperAdminDomain } from '../../domains/super_admin.domain';
import {
  AuthenticationSuperAdminLoginAccountRequest,
  AuthenticationSuperAdminLoginAccountResponse,
  AuthenticationSuperAdminRegisterAccountRequest,
  AuthenticationSuperAdminValidateAccountRequest,
} from './super_admin.mics';

export interface IAuthenticationSuperAdminGrpcService {
  registerAccountSuperAdmin(
    data: AuthenticationSuperAdminRegisterAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationSuperAdminDomain>;

  loginAccountSuperAdmin(
    data: AuthenticationSuperAdminLoginAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationSuperAdminLoginAccountResponse>;

  validateAccountSuperAdmin(
    data: AuthenticationSuperAdminValidateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationSuperAdminDomain>;
}
