import { OrganizationCreatedOneHandler } from './organization-created-one/organization-created-one.handler';
import { OrganizationDeletedOneHandler } from './organization-deleted-one/organization-deleted-one.handler';
import { OrganizationReadedAllHandler } from './organization-readed-all/organization-readed-all.handler';
import { OrganizationReadedOneByEmailHandler } from './organization-readed-one-by-email/organization-readed-one-by-email.handler';
import { OrganizationReadedOneHandler } from './organization-readed-one/organization-readed-one.handler';
import { OrganizationUpdatedOneHandler } from './organization-updated-one/organization-updated-one.handler';

export const OrganizationEventHandlers = [
  OrganizationCreatedOneHandler,
  OrganizationUpdatedOneHandler,
  OrganizationDeletedOneHandler,
  OrganizationReadedAllHandler,
  OrganizationReadedOneHandler,
  OrganizationReadedOneByEmailHandler,
];

export { OrganizationCreatedOneEvent } from './organization-created-one/organization-created-one.event';
export { OrganizationDeletedOneEvent } from './organization-deleted-one/organization-deleted-one.event';
export { OrganizationReadedAllEvent } from './organization-readed-all/organization-readed-all.event';
export { OrganizationReadedOneByEmailEvent } from './organization-readed-one-by-email/organization-readed-one-by-email.event';
export { OrganizationReadedOneEvent } from './organization-readed-one/organization-readed-one.event';
export { OrganizationUpdatedOneEvent } from './organization-updated-one/organization-updated-one.event';
