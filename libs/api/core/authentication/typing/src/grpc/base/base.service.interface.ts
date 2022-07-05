import { AuthenticationBaseDomain } from '../../domains/base.domain';
import {
  AuthenticationBaseLoginAccountRequest,
  AuthenticationBaseLoginAccountResponse,
  AuthenticationBaseRegisterAccountRequest,
  AuthenticationBaseValidateAccountRequest,
} from './base.mics';

export interface IAuthenticationBaseGrpcService {
  registerAccountBase(
    data: AuthenticationBaseRegisterAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationBaseDomain>;

  loginAccountBase(
    data: AuthenticationBaseLoginAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationBaseLoginAccountResponse>;

  validateAccountBase(
    data: AuthenticationBaseValidateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationBaseDomain>;
}
