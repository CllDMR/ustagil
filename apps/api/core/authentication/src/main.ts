import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RpcException, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_MS_GRPC_URL } from '@ustagil/api/core/authentication/constant';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const aqeqwe = app.get(ACCOUNT_MS_GRPC);
  // console.log('🚀 ~ file: main.ts ~ line 30 ~ bootstrap ~ aqeqwe', aqeqwe);

  // const asdasdad = app.get(AppModule);
  // console.log('🚀 ~ file: main.ts ~ line 30 ~ bootstrap ~ asdasdad', asdasdad);

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

  const _authenticationMicroservice = app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: AUTHENTICATION_MS_GRPC_URL,
      package: 'authentication',
      protoPath: join(__dirname, 'assets/authentication.proto'),
      loader: {
        keepCase: true,
      },
    },
  });

  await app.init();
  await app.startAllMicroservices();
}

bootstrap();
