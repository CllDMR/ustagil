import { Observable } from 'rxjs';
import { AccountSuperAdminDomain } from '../../domains/super_admin.domain';
import {
  AccountSuperAdminCreateOneRequest,
  AccountSuperAdminDeleteOneRequest,
  AccountSuperAdminReadAllRequest,
  AccountSuperAdminReadAllResponse,
  AccountSuperAdminReadOneByEmailRequest,
  AccountSuperAdminReadOneRequest,
  AccountSuperAdminUpdateOneRequest,
} from './super_admin.mics';

export interface IAccountSuperAdminGrpcService {
  ListAccountSuperAdmins(
    data: AccountSuperAdminReadAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListSuperAdminsRequest, ListSuperAdminsResponse>
  ): Observable<AccountSuperAdminReadAllResponse>;

  GetAccountSuperAdmin(
    data: AccountSuperAdminReadOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Observable<AccountSuperAdminDomain>;

  GetAccountSuperAdminByEmail(
    data: AccountSuperAdminReadOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Observable<AccountSuperAdminDomain>;

  CreateAccountSuperAdmin(
    data: AccountSuperAdminCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateSuperAdminRequest, SuperAdminDomain>
  ): Observable<AccountSuperAdminDomain>;

  UpdateAccountSuperAdmin(
    data: AccountSuperAdminUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateSuperAdminRequest, SuperAdminDomain>
  ): Observable<AccountSuperAdminDomain>;

  DeleteAccountSuperAdmin(
    data: AccountSuperAdminDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteSuperAdminRequest, void>
  ): Observable<void>;
}
