import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_MS_GRPC_URL } from '@ustagil/api/core/authentication/constant';
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

  const _authenticationBaseMicroservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: AUTHENTICATION_MS_GRPC_URL,
      package: 'authenticationBase',
      protoPath: join(__dirname, 'assets/authentication/base.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
