interface User {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListUsersRequest {
  page_size: number;
}

export interface ListUsersResponse {
  users: User[];
}

export interface GetUserRequest {
  id: string;
}

export interface CreateUserRequest {
  user: Omit<User, 'id'>;
}

export interface UpdateUserRequest {
  id: string;
  user: Partial<Omit<User, 'id'>>;
}

export interface DeleteUserRequest {
  id: string;
}
