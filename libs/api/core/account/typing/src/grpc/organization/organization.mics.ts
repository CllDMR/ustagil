interface Organization {
  _id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListOrganizationsRequest {
  page_size: number;
  page_token: string;
}

export interface ListOrganizationsResponse {
  organizations: Organization[];
  next_page_token: string;
}

export interface GetOrganizationRequest {
  id: string;
}

export interface CreateOrganizationRequest {
  organization: Omit<Organization, '_id'>;
}

export interface UpdateOrganizationRequest {
  id: string;
  organization: Partial<Omit<Organization, '_id'>>;
}

export interface DeleteOrganizationRequest {
  id: string;
}
