import { SuperAdminReadAllHandler } from './read-all/read-all.handler';
import { SuperAdminReadOneByEmailHandler } from './read-one-by-email/read-one-by-email.handler';
import { SuperAdminReadOneHandler } from './read-one/read-one.handler';

export const SuperAdminQueryHandlers = [
  SuperAdminReadAllHandler,
  SuperAdminReadOneHandler,
  SuperAdminReadOneByEmailHandler,
];

export { SuperAdminReadAllQuery } from './read-all/read-all.query';
export { SuperAdminReadOneByEmailQuery } from './read-one-by-email/read-one-by-email.query';
export { SuperAdminReadOneQuery } from './read-one/read-one.query';
