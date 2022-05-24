import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import {
  AUTHENTICATION_MS_CLIENT_ID,
  AUTHENTICATION_MS_CONSUMER_GROUP_ID,
} from '@ustagil/api/core/authentication/constant';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['pkc-zm3p0.eu-north-1.aws.confluent.cloud:9092'],
          clientId: AUTHENTICATION_MS_CLIENT_ID,
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: 'FAXIQ2IFDM43YUGN',
            password:
              '9ftfRFxLckRPnfaGdD+7Ue3TaGsPM+/AsLdvRdhujiQ8o0t/WS8vOSV6OsNXsuyO',
          },
          connectionTimeout: 45000,
        },
        consumer: {
          groupId: AUTHENTICATION_MS_CONSUMER_GROUP_ID,
        },
        subscribe: {
          fromBeginning: true,
        },
      },
    }
  );
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
  app.listen();
}

bootstrap();
