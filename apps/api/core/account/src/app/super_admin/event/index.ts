import { AccountSuperAdminCreatedOneHandler } from './created-one/created-one.handler';
import { AccountSuperAdminDeletedOneHandler } from './deleted-one/deleted-one.handler';
import { AccountSuperAdminReadedAllHandler } from './readed-all/readed-all.handler';
import { AccountSuperAdminReadedOneByEmailHandler } from './readed-one-by-email/readed-one-by-email.handler';
import { AccountSuperAdminReadedOneHandler } from './readed-one/readed-one.handler';
import { AccountSuperAdminUpdatedOneHandler } from './updated-one/updated-one.handler';

export const AccountSuperAdminEventHandlers = [
  AccountSuperAdminCreatedOneHandler,
  AccountSuperAdminUpdatedOneHandler,
  AccountSuperAdminDeletedOneHandler,
  AccountSuperAdminReadedAllHandler,
  AccountSuperAdminReadedOneHandler,
  AccountSuperAdminReadedOneByEmailHandler,
];

export { AccountSuperAdminCreatedOneEvent } from './created-one/created-one.event';
export { AccountSuperAdminDeletedOneEvent } from './deleted-one/deleted-one.event';
export { AccountSuperAdminReadedAllEvent } from './readed-all/readed-all.event';
export { AccountSuperAdminReadedOneByEmailEvent } from './readed-one-by-email/readed-one-by-email.event';
export { AccountSuperAdminReadedOneEvent } from './readed-one/readed-one.event';
export { AccountSuperAdminUpdatedOneEvent } from './updated-one/updated-one.event';
