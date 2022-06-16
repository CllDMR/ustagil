interface User {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListUsersRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface ListUsersResponse {
  users: User[];
  next_page_cursor: string;
}

export interface GetUserRequest {
  id: string;
}

export interface GetUserByEmailRequest {
  email: string;
}

export type CreateUserRequest = Omit<User, 'id'>;

export interface UpdateUserRequest extends Partial<Omit<User, 'id'>> {
  id: string;
}

export interface DeleteUserRequest {
  id: string;
}
