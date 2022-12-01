import { forwardRef, Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { BoardModule } from 'board/board.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { LikeRepository } from './like.repository';

@Module({
  imports: [
    forwardRef(() => BoardModule),
    UserModule,
    TypeOrmModule.forFeature([Like]),
  ],
  providers: [LikeService, LikeRepository],
  exports: [LikeService],
})
export class LikeModule {}
