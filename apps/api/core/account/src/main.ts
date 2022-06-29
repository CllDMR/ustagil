import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import {
  BASE_MS_GRPC_URL,
  ORGANIZATION_MS_GRPC_URL,
  SUPER_ADMIN_MS_GRPC_URL,
  USER_MS_GPRC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
      url: BASE_MS_GRPC_URL,
      package: 'base',
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
        url: ORGANIZATION_MS_GRPC_URL,
        package: 'organization',
        protoPath: join(__dirname, 'assets/account/organization.proto'),
        loader: {
          keepCase: true,
        },
      },
    });
  const _superAdminMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: SUPER_ADMIN_MS_GRPC_URL,
      package: 'superAdmin',
      protoPath: join(__dirname, 'assets/account/super_admin.proto'),
      loader: {
        keepCase: true,
      },
    },
  });
  const _userMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: USER_MS_GPRC_URL,
      package: 'user',
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
