import { Observable } from 'rxjs';
import { BaseDomain } from '../../domains/base/base.domain';
import {
  BaseCreateOneRequest,
  BaseDeleteOneRequest,
  BaseFindAllRequest,
  BaseFindAllResponse,
  BaseFindOneByEmailRequest,
  BaseFindOneRequest,
  BaseUpdateOneRequest,
} from './base.mics';

export interface IBaseGrpcController {
  ListBases(
    data: BaseFindAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListBasesRequest, ListBasesResponse>
  ): Observable<BaseFindAllResponse>;

  GetBase(
    data: BaseFindOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetBaseRequest, BaseDomain>
  ): Observable<BaseDomain>;

  GetBaseByEmail(
    data: BaseFindOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetBaseRequest, BaseDomain>
  ): Observable<BaseDomain>;

  CreateBase(
    data: BaseCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateBaseRequest, BaseDomain>
  ): Observable<BaseDomain>;

  UpdateBase(
    data: BaseUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateBaseRequest, BaseDomain>
  ): Observable<BaseDomain>;

  DeleteBase(
    data: BaseDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteBaseRequest, void>
  ): Observable<void>;
}
