import { AccountOrganizationReadAllHandler } from './read-all/read-all.handler';
import { AccountOrganizationReadOneByEmailHandler } from './read-one-by-email/read-one-by-email.handler';
import { AccountOrganizationReadOneHandler } from './read-one/read-one.handler';

export const AccountOrganizationQueryHandlers = [
  AccountOrganizationReadAllHandler,
  AccountOrganizationReadOneHandler,
  AccountOrganizationReadOneByEmailHandler,
];

export { AccountOrganizationReadAllQuery } from './read-all/read-all.query';
export { AccountOrganizationReadOneByEmailQuery } from './read-one-by-email/read-one-by-email.query';
export { AccountOrganizationReadOneQuery } from './read-one/read-one.query';
