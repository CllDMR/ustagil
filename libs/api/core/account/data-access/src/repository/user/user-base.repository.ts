import { AccountUserDomain } from '@ustagil/api/core/account/typing';
import { BaseRepository } from '@ustagil/api/core/common/data-access';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccountUserBaseRepository
  extends BaseRepository<AccountUserDomain> {}
