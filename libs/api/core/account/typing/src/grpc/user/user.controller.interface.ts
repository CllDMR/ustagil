import { Observable } from 'rxjs';
import { UserDomain } from '../../domains/user/user.domain';
import {
  UserCreateOneRequest,
  UserDeleteOneRequest,
  UserFindAllRequest,
  UserFindAllResponse,
  UserFindOneByEmailRequest,
  UserFindOneRequest,
  UserUpdateOneRequest,
} from './user.mics';

export interface IUserGrpcController {
  ListUsers(
    data: UserFindAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListUsersRequest, ListUsersResponse>
  ): Observable<UserFindAllResponse>;

  GetUser(
    data: UserFindOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Observable<UserDomain>;

  GetUserByEmail(
    data: UserFindOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Observable<UserDomain>;

  CreateUser(
    data: UserCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateUserRequest, UserDomain>
  ): Observable<UserDomain>;

  UpdateUser(
    data: UserUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateUserRequest, UserDomain>
  ): Observable<UserDomain>;

  DeleteUser(
    data: UserDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteUserRequest, void>
  ): Observable<void>;
}
