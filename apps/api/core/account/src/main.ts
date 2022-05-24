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
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.GRPC,
  //     options: {
  //       package: 'account',
  //       protoPath: join(__dirname, 'account/account.proto'),
  //     },
  //   }
  // );

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'account',
      protoPath: join(__dirname, 'assets/account/account.proto'),
    },
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: ACCOUNT_MS_KAFKA_CLIENT_ID,
  //       brokers: ['pkc-zm3p0.eu-north-1.aws.confluent.cloud:9092'],
  //       ssl: true,
  //       sasl: {
  //         mechanism: 'plain',
  //         username: 'FAXIQ2IFDM43YUGN',
  //         password:
  //           '9ftfRFxLckRPnfaGdD+7Ue3TaGsPM+/AsLdvRdhujiQ8o0t/WS8vOSV6OsNXsuyO',
  //       },
  //       connectionTimeout: 45000,
  //     },
  //     consumer: {
  //       groupId: ACCOUNT_MS_KAFKA_CONSUMER_GROUP_ID,
  //     },
  //     subscribe: {
  //       fromBeginning: true,
  //     },
  //   },
  // });

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

  await app.startAllMicroservices();
}

bootstrap();
