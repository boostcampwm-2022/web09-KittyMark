import { forwardRef, Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { Photo } from './photo.entity';
import { UserModule } from '../user/user.module';
import { PhotoRepository } from 'board/photo.repository';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Photo]),
    UserModule,
    forwardRef(() => LikeModule),
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, PhotoRepository],
  exports: [BoardRepository],
})
export class BoardModule {}
