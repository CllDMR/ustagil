import { UserCreatedOneHandler } from './created-one/created-one.handler';
import { UserDeletedOneHandler } from './deleted-one/deleted-one.handler';
import { UserReadedAllHandler } from './readed-all/readed-all.handler';
import { UserReadedOneByEmailHandler } from './readed-one-by-email/readed-one-by-email.handler';
import { UserReadedOneHandler } from './readed-one/readed-one.handler';
import { UserUpdatedOneHandler } from './updated-one/updated-one.handler';

export const UserEventHandlers = [
  UserCreatedOneHandler,
  UserUpdatedOneHandler,
  UserDeletedOneHandler,
  UserReadedAllHandler,
  UserReadedOneHandler,
  UserReadedOneByEmailHandler,
];

export { UserCreatedOneEvent } from './created-one/created-one.event';
export { UserDeletedOneEvent } from './deleted-one/deleted-one.event';
export { UserReadedAllEvent } from './readed-all/readed-all.event';
export { UserReadedOneByEmailEvent } from './readed-one-by-email/readed-one-by-email.event';
export { UserReadedOneEvent } from './readed-one/readed-one.event';
export { UserUpdatedOneEvent } from './updated-one/updated-one.event';
