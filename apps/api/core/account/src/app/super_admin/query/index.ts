import { SuperAdminReadAllHandler } from './super_admin-read-all/super_admin-read-all.handler';
import { SuperAdminReadOneByEmailHandler } from './super_admin-read-one-by-email/super_admin-read-one-by-email.handler';
import { SuperAdminReadOneHandler } from './super_admin-read-one/super_admin-read-one.handler';

export const SuperAdminQueryHandlers = [
  SuperAdminReadAllHandler,
  SuperAdminReadOneHandler,
  SuperAdminReadOneByEmailHandler,
];

export { SuperAdminReadAllQuery } from './super_admin-read-all/super_admin-read-all.query';
export { SuperAdminReadOneByEmailQuery } from './super_admin-read-one-by-email/super_admin-read-one-by-email.query';
export { SuperAdminReadOneQuery } from './super_admin-read-one/super_admin-read-one.query';
