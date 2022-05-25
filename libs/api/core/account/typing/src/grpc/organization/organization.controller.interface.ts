import { Metadata } from '@grpc/grpc-js';
import { OrganizationDomain } from '../../domains/organization/organization.domain';
import {
  CreateOrganizationRequest,
  DeleteOrganizationRequest,
  GetOrganizationRequest,
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  UpdateOrganizationRequest,
} from './organization.mics';

export interface IOrganizationGrpcController {
  listOrganizations(
    data: ListOrganizationsRequest,
    metadata: Metadata
    // call: ServerUnaryCall<ListOrganizationsRequest, ListOrganizationsResponse>
  ): Promise<ListOrganizationsResponse>;

  getOrganization(
    data: GetOrganizationRequest,
    metadata: Metadata
    // call: ServerUnaryCall<GetOrganizationRequest, OrganizationDomain>
  ): Promise<OrganizationDomain>;

  createOrganization(
    data: CreateOrganizationRequest,
    metadata: Metadata
    // call: ServerUnaryCall<CreateOrganizationRequest, OrganizationDomain>
  ): Promise<OrganizationDomain>;

  updateOrganization(
    data: UpdateOrganizationRequest,
    metadata: Metadata
    // call: ServerUnaryCall<UpdateOrganizationRequest, OrganizationDomain>
  ): Promise<OrganizationDomain>;

  deleteOrganization(
    data: DeleteOrganizationRequest,
    metadata: Metadata
    // call: ServerUnaryCall<DeleteOrganizationRequest, void>
  ): Promise<void>;
}
