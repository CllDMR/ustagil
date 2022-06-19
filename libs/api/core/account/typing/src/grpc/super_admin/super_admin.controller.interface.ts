import { Observable } from 'rxjs';
import { SuperAdminDomain } from '../../domains/super_admin/super_admin.domain';
import {
  SuperAdminCreateOneRequest,
  SuperAdminDeleteOneRequest,
  SuperAdminFindAllRequest,
  SuperAdminFindAllResponse,
  SuperAdminFindOneByEmailRequest,
  SuperAdminFindOneRequest,
  SuperAdminUpdateOneRequest,
} from './super_admin.mics';

export interface ISuperAdminGrpcController {
  ListSuperAdmins(
    data: SuperAdminFindAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListSuperAdminsRequest, ListSuperAdminsResponse>
  ): Observable<SuperAdminFindAllResponse>;

  GetSuperAdmin(
    data: SuperAdminFindOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Observable<SuperAdminDomain>;

  GetSuperAdminByEmail(
    data: SuperAdminFindOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Observable<SuperAdminDomain>;

  CreateSuperAdmin(
    data: SuperAdminCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateSuperAdminRequest, SuperAdminDomain>
  ): Observable<SuperAdminDomain>;

  UpdateSuperAdmin(
    data: SuperAdminUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateSuperAdminRequest, SuperAdminDomain>
  ): Observable<SuperAdminDomain>;

  DeleteSuperAdmin(
    data: SuperAdminDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteSuperAdminRequest, void>
  ): Observable<void>;
}
