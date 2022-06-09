import { AuthenticationDomain } from '../domains/authentication.domain';
import {
  LoginAccountRequest,
  LoginAccountResponse,
  RegisterAccountRequest,
  ValidateAccountRequest,
} from './authentication.mics';

export interface IAuthenticationGrpcController {
  registerAccount(
    data: RegisterAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationDomain>;

  loginAccount(
    data: LoginAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<LoginAccountResponse>;

  validateAccount(
    data: ValidateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AuthenticationDomain>;
}
