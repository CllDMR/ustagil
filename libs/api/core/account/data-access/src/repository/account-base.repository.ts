import { AccountDomain } from '@ustagil/api/core/account/typing';
import { BaseRepository } from '@ustagil/api/core/common/data-access';
import { Account } from '..';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AccountBaseRepository
  extends BaseRepository<Account, AccountDomain> {}
