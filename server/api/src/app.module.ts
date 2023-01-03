import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ResponseInterceptor } from './interceptor/responseInterceptor';
import { S3Module } from './S3/S3.module';
import { AuthGuard } from './auth/auth.guard';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './user/follow/follow.module';
import { MapModule } from './map/map.module';
import { RedisModule } from './redis/redis.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        UserModule,
        HttpModule,
        AuthModule,
        BoardModule,
        CommentModule,
        S3Module,
        FollowModule,
        MapModule,
        RedisModule,
        MongooseModule.forRoot(process.env.MONGODB_URI),
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
        { provide: APP_GUARD, useClass: AuthGuard },
    ],
})
export class AppModule {}
