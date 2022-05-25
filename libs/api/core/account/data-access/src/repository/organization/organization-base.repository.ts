import { OrganizationDomain } from '@ustagil/api/core/account/typing';
import { BaseRepository } from '@ustagil/api/core/common/data-access';
import { Organization } from '../../schema/organization.schema';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OrganizationBaseRepository
  extends BaseRepository<Organization, OrganizationDomain> {}
