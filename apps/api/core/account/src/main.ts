import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import {
  ACCOUNT_BASE_MS_GRPC_URL,
  ACCOUNT_ORGANIZATION_MS_GRPC_URL,
  ACCOUNT_SUPER_ADMIN_MS_GRPC_URL,
  ACCOUNT_USER_MS_GRPC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { AccountModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountModule);

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

  const _baseMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: ACCOUNT_BASE_MS_GRPC_URL,
      package: 'account_base',
      protoPath: join(__dirname, 'assets/account/base.proto'),
      loader: {
        keepCase: true,
      },
    },
  });
  const _organizationMicroservice =
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        url: ACCOUNT_ORGANIZATION_MS_GRPC_URL,
        package: 'account_organization',
        protoPath: join(__dirname, 'assets/account/organization.proto'),
        loader: {
          keepCase: true,
        },
      },
    });
  const _superAdminMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: ACCOUNT_SUPER_ADMIN_MS_GRPC_URL,
      package: 'account_super_admin',
      protoPath: join(__dirname, 'assets/account/super_admin.proto'),
      loader: {
        keepCase: true,
      },
    },
  });
  const _userMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: ACCOUNT_USER_MS_GRPC_URL,
      package: 'account_user',
      protoPath: join(__dirname, 'assets/account/user.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
