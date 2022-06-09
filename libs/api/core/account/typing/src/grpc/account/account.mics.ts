interface Account {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListAccountsRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface ListAccountsResponse {
  accounts: Account[];
  next_page_cursor: string;
}

export interface GetAccountRequest {
  id: string;
}

export interface GetAccountByEmailRequest {
  email: string;
}

export type CreateAccountRequest = Omit<Account, 'id'>;

export interface UpdateAccountRequest extends Partial<Omit<Account, 'id'>> {
  id: string;
}

export interface DeleteAccountRequest {
  id: string;
}
