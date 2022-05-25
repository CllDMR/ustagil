import { OrganizationReadAllHandler } from './organization-read-all/organization-read-all.handler';
import { OrganizationReadOneByEmailHandler } from './organization-read-one-by-email/organization-read-one-by-email.handler';
import { OrganizationReadOneHandler } from './organization-read-one/organization-read-one.handler';

export const OrganizationQueryHandlers = [
  OrganizationReadAllHandler,
  OrganizationReadOneHandler,
  OrganizationReadOneByEmailHandler,
];

export { OrganizationReadAllQuery } from './organization-read-all/organization-read-all.query';
export { OrganizationReadOneByEmailQuery } from './organization-read-one-by-email/organization-read-one-by-email.query';
export { OrganizationReadOneQuery } from './organization-read-one/organization-read-one.query';
