import { SuperAdminCreatedOneHandler } from './super_admin-created-one/super_admin-created-one.handler';
import { SuperAdminDeletedOneHandler } from './super_admin-deleted-one/super_admin-deleted-one.handler';
import { SuperAdminReadedAllHandler } from './super_admin-readed-all/super_admin-readed-all.handler';
import { SuperAdminReadedOneByEmailHandler } from './super_admin-readed-one-by-email/super_admin-readed-one-by-email.handler';
import { SuperAdminReadedOneHandler } from './super_admin-readed-one/super_admin-readed-one.handler';
import { SuperAdminUpdatedOneHandler } from './super_admin-updated-one/super_admin-updated-one.handler';

export const SuperAdminEventHandlers = [
  SuperAdminCreatedOneHandler,
  SuperAdminUpdatedOneHandler,
  SuperAdminDeletedOneHandler,
  SuperAdminReadedAllHandler,
  SuperAdminReadedOneHandler,
  SuperAdminReadedOneByEmailHandler,
];

export { SuperAdminCreatedOneEvent } from './super_admin-created-one/super_admin-created-one.event';
export { SuperAdminDeletedOneEvent } from './super_admin-deleted-one/super_admin-deleted-one.event';
export { SuperAdminReadedAllEvent } from './super_admin-readed-all/super_admin-readed-all.event';
export { SuperAdminReadedOneByEmailEvent } from './super_admin-readed-one-by-email/super_admin-readed-one-by-email.event';
export { SuperAdminReadedOneEvent } from './super_admin-readed-one/super_admin-readed-one.event';
export { SuperAdminUpdatedOneEvent } from './super_admin-updated-one/super_admin-updated-one.event';
