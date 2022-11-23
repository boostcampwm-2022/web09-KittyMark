import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { Photo } from './photo.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Photo]), UserModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
