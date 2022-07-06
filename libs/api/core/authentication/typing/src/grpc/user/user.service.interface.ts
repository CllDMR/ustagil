import { AuthenticationUserDomain } from '../../domains/user.domain';
import {
  AuthenticationUserLoginAccountRequest,
  AuthenticationUserLoginAccountResponse,
  AuthenticationUserRegisterAccountRequest,
  AuthenticationUserValidateAccountRequest,
} from './user.mics';

export interface IAuthenticationUserGrpcService {
  registerAccountUser(
    data: AuthenticationUserRegisterAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationUserDomain>;

  loginAccountUser(
    data: AuthenticationUserLoginAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationUserLoginAccountResponse>;

  validateAccountUser(
    data: AuthenticationUserValidateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationUserDomain>;
}
