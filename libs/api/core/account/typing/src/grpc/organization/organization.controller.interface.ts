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
  ListOrganizations(
    data: ListOrganizationsRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListOrganizationsRequest, ListOrganizationsResponse>
  ): Promise<ListOrganizationsResponse>;

  GetOrganization(
    data: GetOrganizationRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetOrganizationRequest, OrganizationDomain>
  ): Promise<OrganizationDomain>;

  CreateOrganization(
    data: CreateOrganizationRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateOrganizationRequest, OrganizationDomain>
  ): Promise<OrganizationDomain>;

  UpdateOrganization(
    data: UpdateOrganizationRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateOrganizationRequest, OrganizationDomain>
  ): Promise<OrganizationDomain>;

  DeleteOrganization(
    data: DeleteOrganizationRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteOrganizationRequest, void>
  ): Promise<void>;
}
