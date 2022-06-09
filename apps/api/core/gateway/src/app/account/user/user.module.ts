import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  USER_MS_GPRC,
  USER_MS_GPRC_URL,
} from '@ustagil/api/core/account/constant';
import { join } from 'path';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_MS_GPRC,
        transport: Transport.GRPC,
        options: {
          url: USER_MS_GPRC_URL,
          package: 'user',
          protoPath: join(__dirname, 'assets/account/user.proto'),
          loader: {
            keepCase: true,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
