import { Metadata } from '@grpc/grpc-js';
import { UserDomain } from '../../domains/user/user.domain';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
} from './user.mics';

export interface IUserGrpcController {
  listUsers(
    data: ListUsersRequest,
    metadata: Metadata
    // call: ServerUnaryCall<ListUsersRequest, ListUsersResponse>
  ): Promise<ListUsersResponse>;

  getUser(
    data: GetUserRequest,
    metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Promise<UserDomain>;

  createUser(
    data: CreateUserRequest,
    metadata: Metadata
    // call: ServerUnaryCall<CreateUserRequest, UserDomain>
  ): Promise<UserDomain>;

  updateUser(
    data: UpdateUserRequest,
    metadata: Metadata
    // call: ServerUnaryCall<UpdateUserRequest, UserDomain>
  ): Promise<UserDomain>;

  deleteUser(
    data: DeleteUserRequest,
    metadata: Metadata
    // call: ServerUnaryCall<DeleteUserRequest, void>
  ): Promise<void>;
}
