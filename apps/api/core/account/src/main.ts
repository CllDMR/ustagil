import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
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

  const _accountMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5001',
      package: 'account',
      protoPath: join(__dirname, 'assets/account/account.proto'),
    },
  });
  const _userMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5002',
      package: 'user',
      protoPath: join(__dirname, 'assets/account/user.proto'),
    },
  });
  const _organizationMicroservice =
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5003',
        package: 'organization',
        protoPath: join(__dirname, 'assets/account/organization.proto'),
      },
    });
  const _superAdminMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5004',
      package: 'superAdmin',
      protoPath: join(__dirname, 'assets/account/super_admin.proto'),
    },
  });

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
