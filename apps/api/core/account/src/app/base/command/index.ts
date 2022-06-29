import { BaseCreateOneHandler } from './base-create-one/base-create-one.handler';
import { BaseDeleteOneHandler } from './base-delete-one/base-delete-one.handler';
import { BaseUpdateOneHandler } from './base-update-one/base-update-one.handler';

export const BaseCommandHandlers = [
  BaseCreateOneHandler,
  BaseUpdateOneHandler,
  BaseDeleteOneHandler,
];

export { BaseCreateOneCommand } from './base-create-one/base-create-one.command';
export { BaseDeleteOneCommand } from './base-delete-one/base-delete-one.command';
export { BaseUpdateOneCommand } from './base-update-one/base-update-one.command';
