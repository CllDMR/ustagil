import { UserCreatedOneHandler } from './user-created-one/user-created-one.handler';
import { UserDeletedOneHandler } from './user-deleted-one/user-deleted-one.handler';
import { UserReadedAllHandler } from './user-readed-all/user-readed-all.handler';
import { UserReadedOneByEmailHandler } from './user-readed-one-by-email/user-readed-one-by-email.handler';
import { UserReadedOneHandler } from './user-readed-one/user-readed-one.handler';
import { UserUpdatedOneHandler } from './user-updated-one/user-updated-one.handler';

export const UserEventHandlers = [
  UserCreatedOneHandler,
  UserUpdatedOneHandler,
  UserDeletedOneHandler,
  UserReadedAllHandler,
  UserReadedOneHandler,
  UserReadedOneByEmailHandler,
];

export { UserCreatedOneEvent } from './user-created-one/user-created-one.event';
export { UserDeletedOneEvent } from './user-deleted-one/user-deleted-one.event';
export { UserReadedAllEvent } from './user-readed-all/user-readed-all.event';
export { UserReadedOneByEmailEvent } from './user-readed-one-by-email/user-readed-one-by-email.event';
export { UserReadedOneEvent } from './user-readed-one/user-readed-one.event';
export { UserUpdatedOneEvent } from './user-updated-one/user-updated-one.event';
