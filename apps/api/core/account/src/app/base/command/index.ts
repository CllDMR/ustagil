import { BaseCreateOneHandler } from './create-one/create-one.handler';
import { BaseDeleteOneHandler } from './delete-one/delete-one.handler';
import { BaseUpdateOneHandler } from './update-one/update-one.handler';

export const BaseCommandHandlers = [
  BaseCreateOneHandler,
  BaseUpdateOneHandler,
  BaseDeleteOneHandler,
];

export { BaseCreateOneCommand } from './create-one/create-one.command';
export { BaseDeleteOneCommand } from './delete-one/delete-one.command';
export { BaseUpdateOneCommand } from './update-one/update-one.command';
