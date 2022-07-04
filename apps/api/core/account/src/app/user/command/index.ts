import { UserCreateOneHandler } from './create-one/create-one.handler';
import { UserDeleteOneHandler } from './delete-one/delete-one.handler';
import { UserUpdateOneHandler } from './update-one/update-one.handler';

export const UserCommandHandlers = [
  UserCreateOneHandler,
  UserUpdateOneHandler,
  UserDeleteOneHandler,
];

export { UserCreateOneCommand } from './create-one/create-one.command';
export { UserDeleteOneCommand } from './delete-one/delete-one.command';
export { UserUpdateOneCommand } from './update-one/update-one.command';
