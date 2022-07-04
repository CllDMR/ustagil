import { OrganizationReadAllHandler } from './read-all/read-all.handler';
import { OrganizationReadOneByEmailHandler } from './read-one-by-email/read-one-by-email.handler';
import { OrganizationReadOneHandler } from './read-one/read-one.handler';

export const OrganizationQueryHandlers = [
  OrganizationReadAllHandler,
  OrganizationReadOneHandler,
  OrganizationReadOneByEmailHandler,
];

export { OrganizationReadAllQuery } from './read-all/read-all.query';
export { OrganizationReadOneByEmailQuery } from './read-one-by-email/read-one-by-email.query';
export { OrganizationReadOneQuery } from './read-one/read-one.query';
