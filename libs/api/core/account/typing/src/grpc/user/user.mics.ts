interface User {
  _id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListUsersRequest {
  page_size: number;
  page_token: string;
}

export interface ListUsersResponse {
  users: User[];
  next_page_token: string;
}

export interface GetUserRequest {
  id: string;
}

export interface CreateUserRequest {
  user: Omit<User, '_id'>;
}

export interface UpdateUserRequest {
  id: string;
  user: Partial<Omit<User, '_id'>>;
}

export interface DeleteUserRequest {
  id: string;
}
