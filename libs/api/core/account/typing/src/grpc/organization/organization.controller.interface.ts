import { Observable } from 'rxjs';
import { OrganizationDomain } from '../../domains/organization/organization.domain';
import {
  OrganizationCreateOneRequest,
  OrganizationDeleteOneRequest,
  OrganizationFindAllRequest,
  OrganizationFindAllResponse,
  OrganizationFindOneByEmailRequest,
  OrganizationFindOneRequest,
  OrganizationUpdateOneRequest,
} from './organization.mics';

export interface IOrganizationGrpcController {
  ListOrganizations(
    data: OrganizationFindAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListOrganizationsRequest, ListOrganizationsResponse>
  ): Observable<OrganizationFindAllResponse>;

  GetOrganization(
    data: OrganizationFindOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetOrganizationRequest, OrganizationDomain>
  ): Observable<OrganizationDomain>;

  GetOrganizationByEmail(
    data: OrganizationFindOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetOrganizationRequest, OrganizationDomain>
  ): Observable<OrganizationDomain>;

  CreateOrganization(
    data: OrganizationCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateOrganizationRequest, OrganizationDomain>
  ): Observable<OrganizationDomain>;

  UpdateOrganization(
    data: OrganizationUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateOrganizationRequest, OrganizationDomain>
  ): Observable<OrganizationDomain>;

  DeleteOrganization(
    data: OrganizationDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteOrganizationRequest, void>
  ): Observable<void>;
}
