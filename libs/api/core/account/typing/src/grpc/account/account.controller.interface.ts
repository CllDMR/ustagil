import { AccountDomain } from '../../domains/account/account.domain';
import {
  CreateAccountRequest,
  DeleteAccountRequest,
  GetAccountRequest,
  ListAccountsRequest,
  ListAccountsResponse,
  UpdateAccountRequest,
} from './account.mics';

export interface IAccountGrpcController {
  ListAccounts(
    data: ListAccountsRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<ListAccountsResponse>;

  GetAccount(
    data: GetAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  CreateAccount(
    data: CreateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  UpdateAccount(
    data: UpdateAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  DeleteAccount(
    data: DeleteAccountRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteAccountRequest, void>
  ): Promise<void>;
}
