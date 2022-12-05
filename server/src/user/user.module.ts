import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { S3Module } from 'src/S3/S3.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), S3Module, FollowModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
