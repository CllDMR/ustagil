import { OrganizationCreatedOneHandler } from './created-one/created-one.handler';
import { OrganizationDeletedOneHandler } from './deleted-one/deleted-one.handler';
import { OrganizationReadedAllHandler } from './readed-all/readed-all.handler';
import { OrganizationReadedOneByEmailHandler } from './readed-one-by-email/readed-one-by-email.handler';
import { OrganizationReadedOneHandler } from './readed-one/readed-one.handler';
import { OrganizationUpdatedOneHandler } from './updated-one/updated-one.handler';

export const OrganizationEventHandlers = [
  OrganizationCreatedOneHandler,
  OrganizationUpdatedOneHandler,
  OrganizationDeletedOneHandler,
  OrganizationReadedAllHandler,
  OrganizationReadedOneHandler,
  OrganizationReadedOneByEmailHandler,
];

export { OrganizationCreatedOneEvent } from './created-one/created-one.event';
export { OrganizationDeletedOneEvent } from './deleted-one/deleted-one.event';
export { OrganizationReadedAllEvent } from './readed-all/readed-all.event';
export { OrganizationReadedOneByEmailEvent } from './readed-one-by-email/readed-one-by-email.event';
export { OrganizationReadedOneEvent } from './readed-one/readed-one.event';
export { OrganizationUpdatedOneEvent } from './updated-one/updated-one.event';
