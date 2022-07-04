import { SuperAdminCreatedOneHandler } from './created-one/created-one.handler';
import { SuperAdminDeletedOneHandler } from './deleted-one/deleted-one.handler';
import { SuperAdminReadedAllHandler } from './readed-all/readed-all.handler';
import { SuperAdminReadedOneByEmailHandler } from './readed-one-by-email/readed-one-by-email.handler';
import { SuperAdminReadedOneHandler } from './readed-one/readed-one.handler';
import { SuperAdminUpdatedOneHandler } from './updated-one/updated-one.handler';

export const SuperAdminEventHandlers = [
  SuperAdminCreatedOneHandler,
  SuperAdminUpdatedOneHandler,
  SuperAdminDeletedOneHandler,
  SuperAdminReadedAllHandler,
  SuperAdminReadedOneHandler,
  SuperAdminReadedOneByEmailHandler,
];

export { SuperAdminCreatedOneEvent } from './created-one/created-one.event';
export { SuperAdminDeletedOneEvent } from './deleted-one/deleted-one.event';
export { SuperAdminReadedAllEvent } from './readed-all/readed-all.event';
export { SuperAdminReadedOneByEmailEvent } from './readed-one-by-email/readed-one-by-email.event';
export { SuperAdminReadedOneEvent } from './readed-one/readed-one.event';
export { SuperAdminUpdatedOneEvent } from './updated-one/updated-one.event';
