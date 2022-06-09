interface Organization {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListOrganizationsRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface ListOrganizationsResponse {
  users: Organization[];
  next_page_cursor: string;
}

export interface GetOrganizationRequest {
  id: string;
}

export interface GetOrganizationByEmailRequest {
  email: string;
}

export type CreateOrganizationRequest = Omit<Organization, 'id'>;

export interface UpdateOrganizationRequest
  extends Partial<Omit<Organization, 'id'>> {
  id: string;
}

export interface DeleteOrganizationRequest {
  id: string;
}
