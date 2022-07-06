import { Observable } from 'rxjs';
import { AccountUserDomain } from '../../domains/user.domain';
import {
  AccountUserCreateOneRequest,
  AccountUserDeleteOneRequest,
  AccountUserReadAllRequest,
  AccountUserReadAllResponse,
  AccountUserReadOneByEmailRequest,
  AccountUserReadOneRequest,
  AccountUserUpdateOneRequest,
} from './user.mics';

export interface IAccountUserGrpcService {
  ListAccountUsers(
    data: AccountUserReadAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListUsersRequest, ListUsersResponse>
  ): Observable<AccountUserReadAllResponse>;

  GetAccountUser(
    data: AccountUserReadOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Observable<AccountUserDomain>;

  GetAccountUserByEmail(
    data: AccountUserReadOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetUserRequest, UserDomain>
  ): Observable<AccountUserDomain>;

  CreateAccountUser(
    data: AccountUserCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateUserRequest, UserDomain>
  ): Observable<AccountUserDomain>;

  UpdateAccountUser(
    data: AccountUserUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateUserRequest, UserDomain>
  ): Observable<AccountUserDomain>;

  DeleteAccountUser(
    data: AccountUserDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteUserRequest, void>
  ): Observable<void>;
}
