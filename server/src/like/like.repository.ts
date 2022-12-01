import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async save(like: Like) {
    await this.likeRepository.save(like);
  }

  async deleteByUserBoardId(userId: number, boardId: number) {
    await this.likeRepository
      .createQueryBuilder('like')
      .delete()
      .from(Like)
      .where('user_id = :userId', { userId: userId })
      .andWhere('board_id = :boardId', { boardId: boardId })
      .execute();
  }

  async findDistinctLike(boardId: number, userId: number) {
    const data = await this.likeRepository
      .createQueryBuilder('like')
      .select()
      .where('user_id = :userId', { userId: userId })
      .andWhere('board_id = :boardId', { boardId: boardId })
      .execute();

    return data.length !== 0;
  }

  async findLikeCountByBoardId(boardId: number) {
    return await this.likeRepository
      .createQueryBuilder('like')
      .select('count(*) as likeCount')
      .where('board_id = :boardId', { boardId: boardId })
      .execute();
  }
}
