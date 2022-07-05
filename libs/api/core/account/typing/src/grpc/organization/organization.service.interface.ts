import { Observable } from 'rxjs';
import { AccountOrganizationDomain } from '../../domains/organization.domain';
import {
  AccountOrganizationCreateOneRequest,
  AccountOrganizationDeleteOneRequest,
  AccountOrganizationReadAllRequest,
  AccountOrganizationReadAllResponse,
  AccountOrganizationReadOneByEmailRequest,
  AccountOrganizationReadOneRequest,
  AccountOrganizationUpdateOneRequest,
} from './organization.mics';

export interface IAccountOrganizationGrpcService {
  ListAccountOrganizations(
    data: AccountOrganizationReadAllRequest
    // metadata: Metadata
    // call: ServerUnaryCall<ListOrganizationsRequest, ListOrganizationsResponse>
  ): Observable<AccountOrganizationReadAllResponse>;

  GetAccountOrganization(
    data: AccountOrganizationReadOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetOrganizationRequest, OrganizationDomain>
  ): Observable<AccountOrganizationDomain>;

  GetAccountOrganizationByEmail(
    data: AccountOrganizationReadOneByEmailRequest
    // metadata: Metadata
    // call: ServerUnaryCall<GetOrganizationRequest, OrganizationDomain>
  ): Observable<AccountOrganizationDomain>;

  CreateAccountOrganization(
    data: AccountOrganizationCreateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<CreateOrganizationRequest, OrganizationDomain>
  ): Observable<AccountOrganizationDomain>;

  UpdateAccountOrganization(
    data: AccountOrganizationUpdateOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<UpdateOrganizationRequest, OrganizationDomain>
  ): Observable<AccountOrganizationDomain>;

  DeleteAccountOrganization(
    data: AccountOrganizationDeleteOneRequest
    // metadata: Metadata
    // call: ServerUnaryCall<DeleteOrganizationRequest, void>
  ): Observable<void>;
}
