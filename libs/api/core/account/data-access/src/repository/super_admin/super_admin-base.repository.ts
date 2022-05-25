import { SuperAdminDomain } from '@ustagil/api/core/account/typing';
import { BaseRepository } from '@ustagil/api/core/common/data-access';
import { SuperAdmin } from '../../schema/super_admin.schema';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SuperAdminBaseRepository
  extends BaseRepository<SuperAdmin, SuperAdminDomain> {}
