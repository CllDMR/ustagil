interface Account {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListAccountsRequest {
  page_size: number;
}

export interface ListAccountsResponse {
  accounts: Account[];
}

export interface GetAccountRequest {
  id: string;
}

export interface CreateAccountRequest {
  account: Omit<Account, 'id'>;
}

export interface UpdateAccountRequest {
  id: string;
  account: Partial<Omit<Account, 'id'>>;
}

export interface DeleteAccountRequest {
  id: string;
}
