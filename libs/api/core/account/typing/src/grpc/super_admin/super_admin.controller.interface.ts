import { Metadata } from '@grpc/grpc-js';
import { SuperAdminDomain } from '../../domains/super_admin/super_admin.domain';
import {
  CreateSuperAdminRequest,
  DeleteSuperAdminRequest,
  GetSuperAdminRequest,
  ListSuperAdminsRequest,
  ListSuperAdminsResponse,
  UpdateSuperAdminRequest,
} from './super_admin.mics';

export interface ISuperAdminGrpcController {
  listSuperAdmins(
    data: ListSuperAdminsRequest,
    metadata: Metadata
    // call: ServerUnaryCall<ListSuperAdminsRequest, ListSuperAdminsResponse>
  ): Promise<ListSuperAdminsResponse>;

  getSuperAdmin(
    data: GetSuperAdminRequest,
    metadata: Metadata
    // call: ServerUnaryCall<GetSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  createSuperAdmin(
    data: CreateSuperAdminRequest,
    metadata: Metadata
    // call: ServerUnaryCall<CreateSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  updateSuperAdmin(
    data: UpdateSuperAdminRequest,
    metadata: Metadata
    // call: ServerUnaryCall<UpdateSuperAdminRequest, SuperAdminDomain>
  ): Promise<SuperAdminDomain>;

  deleteSuperAdmin(
    data: DeleteSuperAdminRequest,
    metadata: Metadata
    // call: ServerUnaryCall<DeleteSuperAdminRequest, void>
  ): Promise<void>;
}
