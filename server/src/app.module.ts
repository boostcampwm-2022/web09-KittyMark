import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { OauthService } from './oauth/oauth.service';
import { OauthModule } from './oauth/oauth.module';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, OauthModule, HttpModule],
  controllers: [],
  providers: [OauthService, AuthService],
})
export class AppModule {}
