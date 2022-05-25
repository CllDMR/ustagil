interface Account {
  _id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListAccountsRequest {
  page_size: number;
  page_token: string;
}

export interface ListAccountsResponse {
  accounts: Account[];
  next_page_token: string;
}

export interface GetAccountRequest {
  id: string;
}

export interface CreateAccountRequest {
  account: Omit<Account, '_id'>;
}

export interface UpdateAccountRequest {
  id: string;
  account: Partial<Omit<Account, '_id'>>;
}

export interface DeleteAccountRequest {
  id: string;
}
