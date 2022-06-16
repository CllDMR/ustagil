interface SuperAdmin {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListSuperAdminsRequest {
  page_size?: number;
  next_page_cursor?: string;
}

export interface ListSuperAdminsResponse {
  super_admins: SuperAdmin[];
  next_page_cursor: string;
}

export interface GetSuperAdminRequest {
  id: string;
}

export interface GetSuperAdminByEmailRequest {
  email: string;
}

export type CreateSuperAdminRequest = Omit<SuperAdmin, 'id'>;

export interface UpdateSuperAdminRequest
  extends Partial<Omit<SuperAdmin, 'id'>> {
  id: string;
}

export interface DeleteSuperAdminRequest {
  id: string;
}
