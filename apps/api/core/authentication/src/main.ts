import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import {
  AUTHENTICATION_BASE_MS_GRPC_URL,
  AUTHENTICATION_ORGANIZATION_MS_GRPC_URL,
  AUTHENTICATION_SUPER_ADMIN_MS_GRPC_URL,
  AUTHENTICATION_USER_MS_GRPC_URL,
} from '@ustagil/api/core/authentication/constant';
import { join } from 'path';
import { AuthenticationModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthenticationModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const errorsArray = errors
          .map((err) => Object.values(err.constraints))
          .flat();
        const errorsString = JSON.stringify(errorsArray);
        const errorsBuffer = Buffer.from(errorsString);

        throw new RpcException(errorsBuffer);
      },
    })
  );

  const _authenticationBaseMicroservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: AUTHENTICATION_BASE_MS_GRPC_URL,
      package: 'authentication_base',
      protoPath: join(__dirname, 'assets/authentication/base.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  const _authenticationOrganizationMicroservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: AUTHENTICATION_ORGANIZATION_MS_GRPC_URL,
      package: 'authentication_organization',
      protoPath: join(__dirname, 'assets/authentication/organization.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  const _authenticationSuperAdminMicroservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: AUTHENTICATION_SUPER_ADMIN_MS_GRPC_URL,
      package: 'authentication_super_admin',
      protoPath: join(__dirname, 'assets/authentication/super_admin.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  const _authenticationUserMicroservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: AUTHENTICATION_USER_MS_GRPC_URL,
      package: 'authentication_user',
      protoPath: join(__dirname, 'assets/authentication/user.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
