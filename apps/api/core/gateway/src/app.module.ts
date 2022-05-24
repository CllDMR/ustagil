import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [AccountModule, AuthenticationModule],
})
export class AppModule {}
