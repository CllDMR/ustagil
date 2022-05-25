import { UserCreateOneHandler } from './user-create-one/user-create-one.handler';
import { UserDeleteOneHandler } from './user-delete-one/user-delete-one.handler';
import { UserUpdateOneHandler } from './user-update-one/user-update-one.handler';

export const UserCommandHandlers = [
  UserCreateOneHandler,
  UserUpdateOneHandler,
  UserDeleteOneHandler,
];

export { UserCreateOneCommand } from './user-create-one/user-create-one.command';
export { UserDeleteOneCommand } from './user-delete-one/user-delete-one.command';
export { UserUpdateOneCommand } from './user-update-one/user-update-one.command';
