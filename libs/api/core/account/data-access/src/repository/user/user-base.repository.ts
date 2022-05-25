import { UserDomain } from '@ustagil/api/core/account/typing';
import { BaseRepository } from '@ustagil/api/core/common/data-access';
import { User } from '../../schema/user.schema';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserBaseRepository extends BaseRepository<User, UserDomain> {}
