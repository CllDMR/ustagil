import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export interface ICustomRpcException {
  statusCode: HttpStatus;
  message: string;
  errorCode: string;
  description: string;
  rpcError?: boolean;
}

export function isICustomRpcException(
  obj: unknown
): obj is ICustomRpcException {
  return typeof obj === 'object' && obj !== null && 'rpcError' in obj;
}

export class CustomRpcException extends RpcException {
  constructor(errObj: ICustomRpcException) {
    super({ ...errObj, rpcError: true });
  }
}
