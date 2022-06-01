interface SuperAdmin {
  id: string;
  displayName: string;
  email: string;
  organization: string;
  password: string;
}

export interface ListSuperAdminsRequest {
  page_size: number;
}

export interface ListSuperAdminsResponse {
  super_admins: SuperAdmin[];
}

export interface GetSuperAdminRequest {
  id: string;
}

export interface CreateSuperAdminRequest {
  super_admin: Omit<SuperAdmin, 'id'>;
}

export interface UpdateSuperAdminRequest {
  id: string;
  super_admin: Partial<Omit<SuperAdmin, 'id'>>;
}

export interface DeleteSuperAdminRequest {
  id: string;
}
