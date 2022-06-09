import { SuperAdminDomain } from '../../domains/super_admin/super_admin.domain';
import {
  CreateSuperAdminRequest,
  DeleteSuperAdminRequest,
  GetSuperAdminByEmailRequest,
  GetSuperAdminRequest,
  ListSuperAdminsRequest,
  ListSuperAdminsResponse,
  UpdateSuperAdminRequest,
} from './super_admin.mics';

export interface ISuperAdminGrpcController {
  ListSuperAdmins(
    data: ListSuperAdminsRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListSuperAdminsRequest, ListSuperAdminsResponse>
  ): Promise<ListSuperAdminsResponse>;

  GetSuperAdmin(
    data: GetSuperAdminRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  GetSuperAdminByEmail(
    data: GetSuperAdminByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  CreateSuperAdmin(
    data: CreateSuperAdminRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  UpdateSuperAdmin(
    data: UpdateSuperAdminRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  DeleteSuperAdmin(
    data: DeleteSuperAdminRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteSuperAdminRequest, void>
  ): Promise<void>;
}
