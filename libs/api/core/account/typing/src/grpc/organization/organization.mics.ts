interface Organization {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListOrganizationsRequest {
  page_size: number;
}

export interface ListOrganizationsResponse {
  organizations: Organization[];
}

export interface GetOrganizationRequest {
  id: string;
}

export interface CreateOrganizationRequest {
  organization: Omit<Organization, 'id'>;
}

export interface UpdateOrganizationRequest {
  id: string;
  organization: Partial<Omit<Organization, 'id'>>;
}

export interface DeleteOrganizationRequest {
  id: string;
}
