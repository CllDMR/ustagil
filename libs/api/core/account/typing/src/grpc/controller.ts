import { Metadata } from '@grpc/grpc-js';
import { AccountDomain } from '../domains/account.domain';
import {
  CreateAccountRequest,
  DeleteAccountRequest,
  GetAccountRequest,
  ListAccountsRequest,
  ListAccountsResponse,
  UpdateAccountRequest,
} from './mics';

export interface IAccountGrpcController {
  listAccounts(
    data: ListAccountsRequest,
    metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<ListAccountsResponse>;

  getAccount(
    data: GetAccountRequest,
    metadata: Metadata
    // call: ServerUnaryCall<GetAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  createAccount(
    data: CreateAccountRequest,
    metadata: Metadata
    // call: ServerUnaryCall<CreateAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  updateAccount(
    data: UpdateAccountRequest,
    metadata: Metadata
    // call: ServerUnaryCall<UpdateAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  deleteAccount(
    data: DeleteAccountRequest,
    metadata: Metadata
    // call: ServerUnaryCall<DeleteAccountRequest, void>
  ): Promise<void>;
}
