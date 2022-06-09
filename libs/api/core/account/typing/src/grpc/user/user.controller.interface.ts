import { UserDomain } from '../../domains/user/user.domain';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserByEmailRequest,
  GetUserRequest,
  ListUsersRequest,
  ListUsersResponse,
  UpdateUserRequest,
} from './user.mics';

export interface IUserGrpcController {
  ListUsers(
    data: ListUsersRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListUsersRequest, ListUsersResponse>
  ): Promise<ListUsersResponse>;

  GetUser(
    data: GetUserRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Promise<UserDomain>;

  GetUserByEmail(
    data: GetUserByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Promise<UserDomain>;

  CreateUser(
    data: CreateUserRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateUserRequest, UserDomain>
  ): Promise<UserDomain>;

  UpdateUser(
    data: UpdateUserRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateUserRequest, UserDomain>
  ): Promise<UserDomain>;

  DeleteUser(
    data: DeleteUserRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteUserRequest, void>
  ): Promise<void>;
}
