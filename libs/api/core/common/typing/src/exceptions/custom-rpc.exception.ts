import { Metadata } from '@grpc/grpc-js';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export interface ICustomRpcError {
  rpcErrorCode: Status;
  statusCode: HttpStatus;
  message: string;
  errorCode: string;
  description: string;
}

export class CustomRpcException extends RpcException {
  constructor(errObj: ICustomRpcError) {
    super({ code: errObj.rpcErrorCode, details: JSON.stringify(errObj) });
  }
}

export function isCustomRpcException(
  obj: unknown
): obj is { code: Status; details: string; metadata: Metadata } {
  // console.log('🚀 ~ file: custom-rpc.exception.ts ~ line 29 ~ obj');
  // console.log(obj);

  if (
    typeof obj === 'object' &&
    obj !== null &&
    'code' in obj &&
    'details' in obj &&
    'metadata' in obj &&
    (obj as any).details &&
    typeof (obj as any).details === 'string' &&
    Object.values(Status).some((e) => e === (obj as any).code)
  ) {
    try {
      JSON.parse((obj as any).details);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export function isCustomRpcError(obj: unknown): obj is ICustomRpcError {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'rpcErrorCode' in obj &&
    'statusCode' in obj &&
    'message' in obj &&
    'errorCode' in obj &&
    'description' in obj
  );
}

export function fromRpcToCustomRpcException(err: unknown): CustomRpcException {
  if (isCustomRpcException(err)) {
    const error = JSON.parse(err.details);

    if (isCustomRpcError(error)) {
      return new CustomRpcException({
        description: error.description,
        errorCode: error.errorCode,
        message: error.message,
        rpcErrorCode: error.rpcErrorCode,
        statusCode: error.statusCode,
      });
    }
  }
}
