interface SuperAdmin {
  _id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListSuperAdminsRequest {
  page_size: number;
  page_token: string;
}

export interface ListSuperAdminsResponse {
  super_admins: SuperAdmin[];
  next_page_token: string;
}

export interface GetSuperAdminRequest {
  id: string;
}

export interface CreateSuperAdminRequest {
  super_admin: Omit<SuperAdmin, '_id'>;
}

export interface UpdateSuperAdminRequest {
  id: string;
  super_admin: Partial<Omit<SuperAdmin, '_id'>>;
}

export interface DeleteSuperAdminRequest {
  id: string;
}
