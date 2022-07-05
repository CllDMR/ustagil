import { AccountSuperAdminReadAllHandler } from './read-all/read-all.handler';
import { AccountSuperAdminReadOneByEmailHandler } from './read-one-by-email/read-one-by-email.handler';
import { AccountSuperAdminReadOneHandler } from './read-one/read-one.handler';

export const AccountSuperAdminQueryHandlers = [
  AccountSuperAdminReadAllHandler,
  AccountSuperAdminReadOneHandler,
  AccountSuperAdminReadOneByEmailHandler,
];

export { AccountSuperAdminReadAllQuery } from './read-all/read-all.query';
export { AccountSuperAdminReadOneByEmailQuery } from './read-one-by-email/read-one-by-email.query';
export { AccountSuperAdminReadOneQuery } from './read-one/read-one.query';
