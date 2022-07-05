import { AuthenticationOrganizationDomain } from '../../domains/organization.domain';
import {
  AuthenticationOrganizationLoginAccountRequest,
  AuthenticationOrganizationLoginAccountResponse,
  AuthenticationOrganizationRegisterAccountRequest,
  AuthenticationOrganizationValidateAccountRequest,
} from './organization.mics';

export interface IAuthenticationOrganizationGrpcService {
  registerAccountOrganization(
    data: AuthenticationOrganizationRegisterAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationOrganizationDomain>;

  loginAccountOrganization(
    data: AuthenticationOrganizationLoginAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationOrganizationLoginAccountResponse>;

  validateAccountOrganization(
    data: AuthenticationOrganizationValidateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationOrganizationDomain>;
}
