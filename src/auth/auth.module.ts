import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
