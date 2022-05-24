import { AccountDomain } from '../domains/account.domain';

export interface ListAccountsRequest {
  page_size: number;
  page_token: string;
}

export interface ListAccountsResponse {
  accounts: AccountDomain[];
  next_page_token: string;
}

export interface GetAccountRequest {
  id: string;
}

export interface CreateAccountRequest {
  account: AccountDomain;
}

export interface UpdateAccountRequest {
  account: Partial<AccountDomain>;
}

export interface DeleteAccountRequest {
  id: string;
}
