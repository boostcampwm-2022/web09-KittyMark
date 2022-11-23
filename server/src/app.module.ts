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

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    HttpModule,
    AuthModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService, ResponseInterceptor],
})
export class AppModule {}
