import { Observable } from 'rxjs';
import { AccountBaseDomain } from '../../domains/base.domain';
import {
  AccountBaseCreateOneRequest,
  AccountBaseDeleteOneRequest,
  AccountBaseReadAllRequest,
  AccountBaseReadAllResponse,
  AccountBaseReadOneByEmailRequest,
  AccountBaseReadOneRequest,
  AccountBaseUpdateOneRequest,
} from './base.mics';

export interface IAccountBaseGrpcService {
  ListAccountBases(
    data: AccountBaseReadAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListBasesRequest, ListBasesResponse>
  ): Observable<AccountBaseReadAllResponse>;

  GetAccountBase(
    data: AccountBaseReadOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetBaseRequest, AccountBaseDomain>
  ): Observable<AccountBaseDomain>;

  GetAccountBaseByEmail(
    data: AccountBaseReadOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetBaseRequest, AccountBaseDomain>
  ): Observable<AccountBaseDomain>;

  CreateAccountBase(
    data: AccountBaseCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateBaseRequest, AccountBaseDomain>
  ): Observable<AccountBaseDomain>;

  UpdateAccountBase(
    data: AccountBaseUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateBaseRequest, AccountBaseDomain>
  ): Observable<AccountBaseDomain>;

  DeleteAccountBase(
    data: AccountBaseDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteBaseRequest, void>
  ): Observable<void>;
}
