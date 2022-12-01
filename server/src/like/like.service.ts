import { ConflictException, Injectable } from '@nestjs/common';
import { LikeBoardDto } from 'board/dto/like-board.dto';
import { BoardRepository } from 'board/board.repository';
import { UserRepository } from '../user/user.repository';
import { LikeRepository } from './like.repository';
import { Like } from './like.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LikeService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly userRepository: UserRepository,
    private readonly likeRepository: LikeRepository,
  ) {}

  async boardLike(likeBoardDto: LikeBoardDto) {
    const { userId, boardId } = likeBoardDto;
    const isDistinct = await this.likeRepository.findDistinctLike(
      boardId,
      userId,
    );
    if (isDistinct) {
      throw new ConflictException('이미 좋아요를 눌렀습니다.');
    }
    const board = await this.boardRepository.findOneById(boardId);
    const user = await this.userRepository.findById(userId);
    const like = plainToInstance(Like, { board, user });
    await this.likeRepository.save(like);
    return await this.likeRepository.findLikeCountByBoardId(boardId);
  }

  async boardUnLike(likeBoardDto: LikeBoardDto) {
    const { userId, boardId } = likeBoardDto;
    await this.likeRepository.deleteByUserBoardId(userId, boardId);
    return await this.likeRepository.findLikeCountByBoardId(boardId);
  }

  async getBoardLikeList(boardId: number) {
    // return await this.likeRepository.findLikeListByBoardId(boardId);
    return await this.boardRepository.findLikeListByBoardId(boardId);
  }
}
