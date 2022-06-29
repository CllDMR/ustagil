import { BaseCreatedOneHandler } from './base-created-one/base-created-one.handler';
import { BaseDeletedOneHandler } from './base-deleted-one/base-deleted-one.handler';
import { BaseReadedAllHandler } from './base-readed-all/base-readed-all.handler';
import { BaseReadedOneByEmailHandler } from './base-readed-one-by-email/base-readed-one-by-email.handler';
import { BaseReadedOneHandler } from './base-readed-one/base-readed-one.handler';
import { BaseUpdatedOneHandler } from './base-updated-one/base-updated-one.handler';

export const BaseEventHandlers = [
  BaseCreatedOneHandler,
  BaseUpdatedOneHandler,
  BaseDeletedOneHandler,
  BaseReadedAllHandler,
  BaseReadedOneHandler,
  BaseReadedOneByEmailHandler,
];

export { BaseCreatedOneEvent } from './base-created-one/base-created-one.event';
export { BaseDeletedOneEvent } from './base-deleted-one/base-deleted-one.event';
export { BaseReadedAllEvent } from './base-readed-all/base-readed-all.event';
export { BaseReadedOneByEmailEvent } from './base-readed-one-by-email/base-readed-one-by-email.event';
export { BaseReadedOneEvent } from './base-readed-one/base-readed-one.event';
export { BaseUpdatedOneEvent } from './base-updated-one/base-updated-one.event';
