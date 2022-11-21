import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OauthController } from './oauth.controller';
import { UserModule } from 'src/user/user.module';
import { OauthService } from './oauth.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [HttpModule, UserModule, AuthModule],
  providers: [OauthService, AuthService],
  controllers: [OauthController],
})
export class OauthModule {}
