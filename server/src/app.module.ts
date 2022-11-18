import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { OauthController } from './oauth/oauth.controller';
import { OauthService } from './oauth/oauth.service';
import { OauthModule } from './oauth/oauth.module';
import { HttpModule } from '@nestjs/axios';
import * as redisStore from 'cache-manager-ioredis';
import { AuthService } from './auth/auth.service';

@Module({
	imports: [
		UserModule,
		DatabaseModule,
		AuthModule,
		OauthModule,
		HttpModule,
		CacheModule.register({
			isGlobal: true,
			// store: redisStore,
			// host: process.env.REDIS_HOST,
			// port: process.env.REDIS_PORT,
		}),
	],
	controllers: [AppController],
	providers: [AppService, OauthService, AuthService],
})
export class AppModule {}
