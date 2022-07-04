import { BaseCreatedOneHandler } from './created-one/created-one.handler';
import { BaseDeletedOneHandler } from './deleted-one/deleted-one.handler';
import { BaseReadedAllHandler } from './readed-all/readed-all.handler';
import { BaseReadedOneByEmailHandler } from './readed-one-by-email/readed-one-by-email.handler';
import { BaseReadedOneHandler } from './readed-one/readed-one.handler';
import { BaseUpdatedOneHandler } from './updated-one/updated-one.handler';

export const BaseEventHandlers = [
  BaseCreatedOneHandler,
  BaseUpdatedOneHandler,
  BaseDeletedOneHandler,
  BaseReadedAllHandler,
  BaseReadedOneHandler,
  BaseReadedOneByEmailHandler,
];

export { BaseCreatedOneEvent } from './created-one/created-one.event';
export { BaseDeletedOneEvent } from './deleted-one/deleted-one.event';
export { BaseReadedAllEvent } from './readed-all/readed-all.event';
export { BaseReadedOneByEmailEvent } from './readed-one-by-email/readed-one-by-email.event';
export { BaseReadedOneEvent } from './readed-one/readed-one.event';
export { BaseUpdatedOneEvent } from './updated-one/updated-one.event';
