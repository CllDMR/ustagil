import { Observable } from 'rxjs';
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
  ): Observable<AccountFindAllResponse>;

  GetAccount(
    data: AccountFindOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetAccountRequest, AccountDomain>
  ): Observable<AccountDomain>;

  GetAccountByEmail(
    data: AccountFindOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetAccountRequest, AccountDomain>
  ): Observable<AccountDomain>;

  CreateAccount(
    data: AccountCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateAccountRequest, AccountDomain>
  ): Observable<AccountDomain>;

  UpdateAccount(
    data: AccountUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateAccountRequest, AccountDomain>
  ): Observable<AccountDomain>;

  DeleteAccount(
    data: AccountDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteAccountRequest, void>
  ): Observable<void>;
}
