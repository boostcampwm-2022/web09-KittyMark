import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { ResponseInterceptor } from './interceptor/responseInterceptor';
import { S3Module } from './S3/S3.module';
import { AuthGuard } from './auth/auth.guard';
import { CommentModule } from 'src/comment/comment.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    HttpModule,
    AuthModule,
    BoardModule,
    CommentModule,
    S3Module,
    MapModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseInterceptor, AuthGuard],
})
export class AppModule {}
