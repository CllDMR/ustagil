import { AccountDomain } from '../../domains/account/account.domain';
import {
  AccountCreateOneRequest,
  AccountDeleteOneRequest,
  AccountFindAllRequest,
  AccountFindAllResponse,
  AccountFindOneByEmailRequest,
  AccountFindOneRequest,
  AccountUpdateOneRequest,
} from './account.mics';

export interface IAccountGrpcController {
  ListAccounts(
    data: AccountFindAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListAccountsRequest, ListAccountsResponse>
  ): Promise<AccountFindAllResponse>;

  GetAccount(
    data: AccountFindOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  GetAccountByEmail(
    data: AccountFindOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  CreateAccount(
    data: AccountCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  UpdateAccount(
    data: AccountUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateAccountRequest, AccountDomain>
  ): Promise<AccountDomain>;

  DeleteAccount(
    data: AccountDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteAccountRequest, void>
  ): Promise<void>;
}
