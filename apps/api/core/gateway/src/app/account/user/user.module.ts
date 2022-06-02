import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_USER_GRPC_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:5002',
          package: 'user',
          protoPath: join(__dirname, 'assets/account/user.proto'),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
